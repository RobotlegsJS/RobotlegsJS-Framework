import { inject, injectable } from "@robotlegsjs/core";

import { GameModel } from "./../../models/GameModel";
import { LevelModel } from "./../../models/LevelModel";
import { GameService } from "./../../services/GameService";
import { ViewPortSize } from "./../../utils/ViewPortSize";
import { EnemyDisplay } from "./../displays/EnemyDisplay";
import { Bullet } from "./../entities/Bullet";
import { Entity } from "./../entities/Entity";
import { Explosion } from "./../entities/Explosion";
import { EntityPool } from "./../utils/EntityPool";
import { GameUtils } from "./../utils/GameUtils";
import { Point } from "./../utils/Point";

@injectable()
export class GameManager {
    @inject(GameModel) private gameModel: GameModel;
    @inject(LevelModel) private model: LevelModel;
    @inject(GameService) private service: GameService;

    private _cannonDirection: number;

    private _enemyPath: Point[];
    private _enemyPathIndex: number;

    private _tickMovement: number;
    private _tickShot: number;

    private _shooting: boolean;

    constructor() {
        this._enemyPath = GameUtils.getEnemyPath();
        this._enemyPathIndex = 0;
        this._tickMovement = 0;
        this._tickShot = 0;
    }
    public cannonMovement(direction = 0): void {
        this._cannonDirection = direction;
    }
    public update(): void {
        this._tickMovement++;
        this._tickShot++;

        if (this._tickMovement > GameUtils.getCurrentSpeed(this.gameModel.level)) {
            this.moveEnemies();
            this.updateExplosions();

            if (Math.random() * 10 < 1) {
                this.createEnemyBullet();
            }
            this._tickMovement = 0;
        }

        if (this._tickShot > 16 && this._shooting) {
            this.createBullets();
        }

        this.moveCannon();
        this.moveBullets();

        this.solveCollisions();
        this.validateNextLevel();
    }
    public startShooting(): void {
        if (this._shooting === false && this._tickShot > 8) {
            this.createBullets();
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
    private moveEnemies(): void {
        let nearEnemyY = 0;
        for (const enemy of this.model.enemies) {
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
            this.service.gameOver();
        }
    }
    private createEnemyBullet(): void {
        const enemyIndex: number = Math.floor(Math.random() * (this.model.enemies.length - 1));

        if (enemyIndex === 0) {
            return;
        }

        const bullet: Bullet = <Bullet>EntityPool.getEntity(Entity.BULLET);
        bullet.x = this.model.enemies[enemyIndex].x;
        bullet.y = this.model.enemies[enemyIndex].y + 10;
        bullet.target = Bullet.PlAYER;
        bullet.applyPosition();
        this.model.addBullet(bullet);
    }
    private updateExplosions(): void {
        for (const explosion of this.model.exposions) {
            (<Explosion>explosion).update();
            if ((<Explosion>explosion).remove) {
                this.model.toRemove.push(explosion);
            }
        }
    }
    private solveCollisions(): void {
        for (const bullet of this.model.bullets) {
            if ((<Bullet>bullet).target === Bullet.PlAYER) {
                if (GameUtils.isCollision(bullet, this.model.cannon)) {
                    this.createExplosion(this.model.cannon);
                    this.model.cannon.x = ViewPortSize.HALF_WIDTH;
                    this.model.toRemove.push(bullet);
                    this.service.decreaseLives();
                    break;
                }
            } else {
                for (const entity of this.model.enemies) {
                    if (GameUtils.isCollision(bullet, entity)) {
                        this.createExplosion(entity);
                        this.model.toRemove.push(entity);
                        this.model.toRemove.push(bullet);
                        this.service.increasePoints();
                        break;
                    }
                }
            }
        }
    }
    private validateNextLevel(): void {
        if (this.model.enemies.length > 0) {
            return;
        }
        this.service.pause();
        this.service.increaseLevel();
    }
    private moveCannon(): void {
        let newCannonXPosition: number = this.model.cannon.x + this._cannonDirection;
        newCannonXPosition = Math.min(ViewPortSize.MAX_WIDTH, newCannonXPosition);
        newCannonXPosition = Math.max(0, newCannonXPosition);

        this.model.cannon.x = newCannonXPosition;
        this.model.cannon.applyPosition();
    }
    private createExplosion(entity: Entity): void {
        const explosion: Explosion = <Explosion>EntityPool.getEntity(Entity.EXPLOSION);
        explosion.x = entity.x;
        explosion.y = entity.y;
        if (entity.typeID === Entity.CANNON) {
            explosion.y = entity.y - 10;
        }
        explosion.reset();
        explosion.applyPosition();
        this.model.addExplosion(explosion);
    }
    private moveBullets(): void {
        let speedY: number;

        for (const bullet of this.model.bullets) {
            speedY = -3;
            if ((<Bullet>bullet).target === Bullet.PlAYER) {
                speedY = 3;
            }
            bullet.y += speedY;
            bullet.applyPosition();
            if (bullet.y >= ViewPortSize.MAX_HEIGHT - 100 || bullet.y <= 0) {
                this.model.toRemove.push(bullet);
            }
        }
    }
    private createBullets(): void {
        this.shootBullets();
        this._tickShot = 0;
    }
    private shootBullets(): void {
        const bullet = <Bullet>EntityPool.getEntity(Entity.BULLET);
        bullet.x = this.model.cannon.x;
        bullet.y = this.model.cannon.y - 10;
        bullet.target = Bullet.ENEMY;
        bullet.applyPosition();
        this.model.addBullet(bullet);
    }
}
