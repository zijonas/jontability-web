import { Component } from '@angular/core';

@Component({
    template: `
        <mat-toolbar color="primary">
            <div class="header">
                <app-header></app-header>
            </div>
        </mat-toolbar>
        <mat-sidenav-container>
            <mat-sidenav mode="side" opened>
                <div>HOME</div>
            </mat-sidenav>
            <mat-sidenav-content>
                <router-outlet></router-outlet>
            </mat-sidenav-content>
        </mat-sidenav-container>
    `
})
export class NavigationParentComponent {
}
