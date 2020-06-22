import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseEntity } from 'src/app/core/base/baseEntity';

@Component({
    selector: 'card-editor',
    template: `
        <div class="head-box">
            <form class="addPostForm" action="#" method="POST">
                <mat-form-field>
                    <mat-label>Nome</mat-label>
                    <input matInput [(ngModel)]="entity.name" type="text" placeholder="Ex: Entrada" name="name" />
                </mat-form-field>
                <button mat-raised-button color="primary" (click)="add.emit()" value="Add">Gravar</button>
                <button mat-raised-button color="accent" (click)="clear.emit()" value="add">Limpar</button>
                <button mat-raised-button color="warn" (click)="delete.emit()" value="delete">Remover</button>
            </form>
        </div>
    `
})
export class CardEditorComponent {
    @Input()
    entity: BaseEntity;

    @Output()
    add: EventEmitter<any> = new EventEmitter();

    @Output()
    delete: EventEmitter<any> = new EventEmitter();

    @Output()
    clear: EventEmitter<any> = new EventEmitter();
}
