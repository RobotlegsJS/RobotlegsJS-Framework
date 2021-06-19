import { inject, injectable } from "@robotlegsjs/core";
import { GameModel } from "../../models/GameModel";
import { LevelModel } from "../../models/LevelModel";
import { GameService } from "../../services/GameService";
import { ViewPortSize } from "../../utils/ViewPortSize";
import { EnemyDisplay } from "../displays/EnemyDisplay";
import { Bullet } from "../entities/Bullet";
import { Entity } from "../entities/Entity";
import { Explosion } from "../entities/Explosion";
import { EntityPool } from "../utils/EntityPool";
import { GameUtils } from "../utils/GameUtils";
import { Point } from "../utils/Point";

@injectable()
export class GameManager {
    @inject(GameModel)
    private _gameModel: GameModel;

    @inject(LevelModel)
    private _model: LevelModel;

    @inject(GameService)
    private _service: GameService;

    private _cannonDirection: number;

    private _enemyPath: Point[];
    private _enemyPathIndex: number;

    private _tickMovement: number;
    private _tickShot: number;

    private _shooting: boolean;

    public constructor() {
        this._enemyPath = GameUtils.getEnemyPath();
        this._enemyPathIndex = 0;
        this._tickMovement = 0;
        this._tickShot = 0;
    }

    public cannonMovement(direction: number = 0): void {
        this._cannonDirection = direction;
    }

    public update(): void {
        this._tickMovement++;
        this._tickShot++;

        if (this._tickMovement > GameUtils.getCurrentSpeed(this._gameModel.level)) {
            this._moveEnemies();
            this._updateExplosions();

            if (Math.random() * 10 < 1) {
                this._createEnemyBullet();
            }
            this._tickMovement = 0;
        }

        if (this._tickShot > 16 && this._shooting) {
            this._createBullets();
        }

        this._moveCannon();
        this._moveBullets();

        this._solveCollisions();
        this._validateNextLevel();
    }

    public startShooting(): void {
        if (this._shooting === false && this._tickShot > 8) {
            this._createBullets();
        }

        this._tickShot = 0;
        this._shooting = true;
    }

    public stopShooting(): void {
        this._shooting = false;
    }

    public resume(): void {
        this._cannonDirection = 0;
        this._tickShot = 0;
        this._shooting = false;
    }

    private _moveEnemies(): void {
        let nearEnemyY = 0;
        for (const enemy of this._model.enemies) {
            enemy.x += this._enemyPath[this._enemyPathIndex].x;
            enemy.y += this._enemyPath[this._enemyPathIndex].y;
            enemy.applyPosition();
            (<EnemyDisplay>enemy.display).tick();

            nearEnemyY = Math.max(enemy.y, nearEnemyY);
        }

        this._enemyPathIndex++;
        if (this._enemyPathIndex === this._enemyPath.length) {
            this._enemyPathIndex = 0;
        }
        if (nearEnemyY > ViewPortSize.MAX_HEIGHT - 120) {
            this._service.gameOver();
        }
    }

    private _createEnemyBullet(): void {
        const enemyIndex: number = Math.floor(Math.random() * (this._model.enemies.length - 1));

        if (enemyIndex === 0) {
            return;
        }

        const bullet: Bullet = <Bullet>EntityPool.getEntity(Entity.BULLET);
        bullet.x = this._model.enemies[enemyIndex].x;
        bullet.y = this._model.enemies[enemyIndex].y + 10;
        bullet.target = Bullet.PlAYER;
        bullet.applyPosition();
        this._model.addBullet(bullet);
    }

    private _updateExplosions(): void {
        for (const explosion of this._model.exposions) {
            (<Explosion>explosion).update();
            if ((<Explosion>explosion).remove) {
                this._model.toRemove.push(explosion);
            }
        }
    }

    private _solveCollisions(): void {
        for (const bullet of this._model.bullets) {
            if ((<Bullet>bullet).target === Bullet.PlAYER) {
                if (GameUtils.isCollision(bullet, this._model.cannon)) {
                    this._createExplosion(this._model.cannon);
                    this._model.cannon.x = ViewPortSize.HALF_WIDTH;
                    this._model.toRemove.push(bullet);
                    this._service.decreaseLives();
                    break;
                }
            } else {
                for (const entity of this._model.enemies) {
                    if (GameUtils.isCollision(bullet, entity)) {
                        this._createExplosion(entity);
                        this._model.toRemove.push(entity);
                        this._model.toRemove.push(bullet);
                        this._service.increasePoints();
                        break;
                    }
                }
            }
        }
    }

    private _validateNextLevel(): void {
        if (this._model.enemies.length > 0) {
            return;
        }
        this._service.pause();
        this._service.increaseLevel();
    }

    private _moveCannon(): void {
        let newCannonXPosition: number = this._model.cannon.x + this._cannonDirection;
        newCannonXPosition = Math.min(ViewPortSize.MAX_WIDTH, newCannonXPosition);
        newCannonXPosition = Math.max(0, newCannonXPosition);

        this._model.cannon.x = newCannonXPosition;
        this._model.cannon.applyPosition();
    }

    private _createExplosion(entity: Entity): void {
        const explosion: Explosion = <Explosion>EntityPool.getEntity(Entity.EXPLOSION);
        explosion.x = entity.x;
        explosion.y = entity.y;
        if (entity.typeID === Entity.CANNON) {
            explosion.y = entity.y - 10;
        }
        explosion.reset();
        explosion.applyPosition();
        this._model.addExplosion(explosion);
    }

    private _moveBullets(): void {
        let speedY: number;

        for (const bullet of this._model.bullets) {
            speedY = -3;
            if ((<Bullet>bullet).target === Bullet.PlAYER) {
                speedY = 3;
            }
            bullet.y += speedY;
            bullet.applyPosition();
            if (bullet.y >= ViewPortSize.MAX_HEIGHT - 100 || bullet.y <= 0) {
                this._model.toRemove.push(bullet);
            }
        }
    }

    private _createBullets(): void {
        this._shootBullets();
        this._tickShot = 0;
    }

    private _shootBullets(): void {
        const bullet = <Bullet>EntityPool.getEntity(Entity.BULLET);
        bullet.x = this._model.cannon.x;
        bullet.y = this._model.cannon.y - 10;
        bullet.target = Bullet.ENEMY;
        bullet.applyPosition();
        this._model.addBullet(bullet);
    }
}
