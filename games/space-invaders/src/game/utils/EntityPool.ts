import { AtlasKeys } from "./../../utils/AtlasKeys";
import { BulletDisplay } from "./../displays/BulletDisplay";
import { CannonDisplay } from "./../displays/CannonDisplay";
import { EnemyDisplay } from "./../displays/EnemyDisplay";
import { ExplosionDisplay } from "./../displays/ExplosionDisplay";
import { Bullet } from "./../entities/Bullet";
import { Entity } from "./../entities/Entity";
import { Explosion } from "./../entities/Explosion";

export class EntityPool {
    public static dictionary: Map<number, Entity[]>;

    public static init(): void {
        this.dictionary = new Map<number, Entity[]>();
    }
    public static getEntity(typeId: number): Entity {
        if (this.dictionary.get(typeId) === undefined) {
            this.dictionary.set(typeId, new Array<Entity>());
        }
        const list: Entity[] = this.dictionary.get(typeId);
        let entity: Entity;
        if (list.length === 0) {
            entity = this.createEntityByType(typeId);
        } else {
            entity = list.shift();
        }

        if (entity.display) {
            entity.display.visible = true;
        } else {
            entity.display = this.createDisplayByType(typeId);
        }

        return entity;
    }
    public static back(entity: Entity): void {
        const list: Entity[] = this.dictionary.get(entity.typeID);
        entity.display.visible = false;

        if (list.indexOf(entity) === -1) {
            list.push(entity);
        }
    }
    private static createDisplayByType(typeId: number): any {
        const typesDisplay: any = {};
        typesDisplay[Entity.BULLET] = { type: BulletDisplay, atlasKey: AtlasKeys.BULLET };
        typesDisplay[Entity.ENEMY_1] = { type: EnemyDisplay, atlasKey: AtlasKeys.ENEMY_01 };
        typesDisplay[Entity.ENEMY_2] = { type: EnemyDisplay, atlasKey: AtlasKeys.ENEMY_02 };
        typesDisplay[Entity.ENEMY_3] = { type: EnemyDisplay, atlasKey: AtlasKeys.ENEMY_03 };
        typesDisplay[Entity.CANNON] = { type: CannonDisplay, atlasKey: AtlasKeys.CANNON };
        typesDisplay[Entity.EXPLOSION] = { type: ExplosionDisplay, atlasKey: AtlasKeys.EXPLOSION };

        const ob = typesDisplay[typeId];
        return new ob.type(ob.atlasKey);
    }
    private static createEntityByType(typeId: number): Entity {
        let entity: Entity;

        if (typeId === Entity.BULLET) {
            entity = new Bullet(typeId);
        } else if (typeId === Entity.EXPLOSION) {
            entity = new Explosion(typeId);
        } else {
            entity = new Entity(typeId);
        }
        return entity;
    }
}
