import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseEntity } from 'src/app/core/base/baseEntity';

@Component({
    selector: 'card-list',
    template: `
        <div class="middle-box">
            <div class="button-grid">
                <mat-card *ngFor="let ent of entities" [ngClass]="{selected: ent == entity}" class="card" (click)="this.onSelect.emit(ent)">
                    <mat-card-header>
                    <mat-card-title>{{ent.name}}</mat-card-title>
                    <mat-card-subtitle>{{ent.id}}</mat-card-subtitle>
                    </mat-card-header>
                </mat-card>
            </div>
        </div>
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
