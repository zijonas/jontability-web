import { BaseEntity } from './baseEntity';
import { BaseService } from './baseService';
import { OnInit } from '@angular/core';

export class BaseComponent<T extends BaseEntity> implements OnInit {

    constructor(private service: BaseService<T>, private type: new () => T) { }

    entities: T[];
    entity: T = new this.type();

    ngOnInit() {
        this.service.getAll()
            .then((acc: T[]) => {
                this.entities = acc;
            });
        this.service.register(((acc: T[]) => {
            this.clear();
            this.entities = acc;
        }).bind(this));
    }

    add() {
        this.service.add(this.entity);
    }

    delete() {
        this.service.delete(this.entity.id);
    }

    clear() {
        this.entity = new this.type();
    }

    onSelect(entity: T) {
        this.entity = entity;
    }
}