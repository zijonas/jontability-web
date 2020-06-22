import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
    template: `
    <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer class="sidenav" fixedInViewport
            [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
            [mode]="(isHandset$ | async) ? 'over' : 'side'"
            [opened]="(isHandset$ | async) === false">
            <mat-toolbar>Menu</mat-toolbar>
            <mat-nav-list>
                <a mat-list-item routerLink="/accounts">Contas</a>
                <a mat-list-item routerLink="/categories">Categorias</a>
                <a mat-list-item routerLink="/posts">Lançamentos</a>
            </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
            <mat-toolbar color="primary">
            <button
                type="button"
                aria-label="Toggle sidenav"
                mat-icon-button
                (click)="drawer.toggle()"
                *ngIf="isHandset$ | async">
                <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
            <app-header></app-header>
            </mat-toolbar>
            <router-outlet></router-outlet>
        </mat-sidenav-content>
    </mat-sidenav-container>
    `
})
export class NavigationParentComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) { }

}
