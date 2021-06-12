import { injectable } from "@robotlegsjs/core";

import { Entity } from "./../game/entities/Entity";

@injectable()
export class LevelModel {
    private _cannon: Entity;
    private _bullets: Entity[];
    private _enemies: Entity[];
    private _exposions: Entity[];

    private _toAdd: Entity[];
    private _toRemove: Entity[];

    public get bullets(): Entity[] {
        return this._bullets;
    }
    public get enemies(): Entity[] {
        return this._enemies;
    }
    public get cannon(): Entity {
        return this._cannon;
    }
    public get exposions(): Entity[] {
        return this._exposions;
    }
    public get toAdd(): Entity[] {
        return this._toAdd;
    }
    public get toRemove(): Entity[] {
        return this._toRemove;
    }
    public reset(): void {
        this._cannon = new Entity(Entity.CANNON);

        this._bullets = new Array<Entity>();
        this._enemies = new Array<Entity>();
        this._exposions = new Array<Entity>();

        this._toAdd = new Array<Entity>();
        this._toRemove = new Array<Entity>();
    }
    public addBullet(entity: Entity): void {
        this._bullets.push(entity);
        this._toAdd.push(entity);
    }
    public addEnemy(entity: Entity): void {
        this._enemies.push(entity);
        this._toAdd.push(entity);
    }
    public addExplosion(entity: Entity): void {
        this._exposions.push(entity);
        this._toAdd.push(entity);
    }
    public setCannon(entity: Entity): void {
        this._cannon = entity;
        this._toAdd.push(entity);
    }
    public removeEntity(entity: Entity): void {
        if (entity.typeID === Entity.BULLET) {
            this.removeFromList(entity, this.bullets);
        } else if (entity.typeID === Entity.EXPLOSION) {
            this.removeFromList(entity, this.exposions);
        } else {
            this.removeFromList(entity, this.enemies);
        }
    }
    private removeFromList(entity: Entity, list: Entity[]): void {
        const index = list.indexOf(entity);
        if (index > -1) {
            list.splice(index, 1);
        }
    }
}
