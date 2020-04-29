import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseEntity } from 'src/app/core/base/baseEntity';

@Component({
    selector: 'card-list',
    template: `
        <div class="head-box">
            <button mat-raised-button color="accent" (click)="clear()" value="add">Limpar</button>
            <button mat-raised-button color="warn" (click)="delete()" value="delete">Remover</button>
            <form class="addPostForm" action="#" method="POST">
                <mat-form-field>
                    <mat-label>Nome</mat-label>
                    <input matInput [(ngModel)]="entity.name" type="text" placeholder="Ex: Entrada" name="name" />
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="add()" value="Add">Gravar</button>
            </form>
        </div>

        <div class="middle-box">
            <div class="button-grid">
            <mat-card *ngFor="let cat of entities" [ngClass]="{selected: cat == entity}" class="card" (click)="onSelect(cat)">
                <mat-card-header>
                <mat-card-title>{{cat.name}}</mat-card-title>
                <mat-card-subtitle>{{cat.id}}</mat-card-subtitle>
                </mat-card-header>
            </mat-card>
            </div>
        </div>
    `
})
export class EditorComponent {
    @Input()
    entities: BaseEntity[];

    @Output()
    add: EventEmitter<any> = new EventEmitter();

    @Output()
    delete: EventEmitter<any> = new EventEmitter();
}
