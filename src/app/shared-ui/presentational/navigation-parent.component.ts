import { Component } from '@angular/core';

@Component({
    selector: 'app-name',
    template: `
        <mat-toolbar color="primary">
            <div class="header">
                <app-header></app-header>
            </div>
        </mat-toolbar>
        <router-outlet></router-outlet>
    `,
    styles: [``]
})
export class NavigationParentComponent {
}
