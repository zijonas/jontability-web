import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseEntity } from 'src/app/core/base/baseEntity';

@Component({
    selector: 'card-list',
    template: `
        <mat-grid-list cols="10" rowHeight="100px" gutterSize="10px">
            <mat-grid-tile *ngFor="let ent of entities">
                <mat-card [ngClass]="{selected: ent == entity}" class="flex" (click)="onSelect.emit(ent)">
                    <mat-card-header>
                    <mat-card-title>{{ent.name}}</mat-card-title>
                    <mat-card-subtitle>{{ent.id}}</mat-card-subtitle>
                    </mat-card-header>
                </mat-card>
            </mat-grid-tile>
        </mat-grid-list>
    `
})
export class CardListComponent {
    @Input()
    entity: BaseEntity;

    @Input()
    entities: BaseEntity[];

    @Output()
    onSelect: EventEmitter<any> = new EventEmitter();
}
