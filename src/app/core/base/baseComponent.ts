import { Injectable, OnInit } from '@angular/core';
import { BaseEntity } from './baseEntity';
import { BaseService } from './baseService';

@Injectable()
export abstract class BaseComponent<T extends BaseEntity> implements OnInit {

    constructor(private service: BaseService<T>, private type: { new ():  T}) { }

    entity: T = new this.type();
    entities: T[];

    ngOnInit() {
        this.service.register(entities => this.entities = entities);
        this.service.loadAll();
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