import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post } from 'src/app/core/model/post';

@Component({
    selector: 'post-list',
    template: `
    <table mat-table [dataSource]="posts" matSort class="mat-elevation-z8 post-table">
        <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Data</th>
            <td mat-cell *matCellDef="let post">{{post.date | date : 'dd.MM.yyyy'}}</td>
        </ng-container>
        <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Tipo</th>
            <td mat-cell *matCellDef="let post">{{post.invoice ? 'Entrada' : 'Saída'}}</td>
        </ng-container>
        <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Categoria</th>
            <td mat-cell *matCellDef="let post">{{post.categoryId | category}}</td>
        </ng-container>
        <ng-container matColumnDef="account">
            <th mat-header-cell *matHeaderCellDef>Conta</th>
            <td mat-cell *matCellDef="let post">{{post.accountId | account}}</td>
        </ng-container>
        <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Descrição</th>
            <td mat-cell *matCellDef="let post">{{post.description}}</td>
        </ng-container>
        <ng-container matColumnDef="value">
            <th mat-header-cell *matHeaderCellDef>Valor</th>
            <td mat-cell *matCellDef="let post">{{post.value | number : '1.2'}}</td>
        </ng-container>
        <ng-container matColumnDef="delete">
            <th mat-header-cell *matHeaderCellDef>Apagar</th>
            <td mat-cell *matCellDef="let post">
                <button class="delete-button" mat-raised-button color="primary" (click)="deletePost.emit(post.id)">
                X
                </button>
            </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let post; columns: displayedColumns;" (click)="selectPost.emit(post)"></tr>
    </table>
    `
})
export class PostList {
    displayedColumns: string[] = ['date', 'type', 'category', 'account', 'description', 'value', 'delete'];

    @Input()
    posts: Post[];

    @Output() 
    deletePost = new EventEmitter<number>();

    @Output() 
    selectPost = new EventEmitter<Post>();
}