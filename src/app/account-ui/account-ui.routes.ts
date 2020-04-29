import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationParentComponent } from '../shared-ui/presentational/navigation-parent.component';
import { AccountComponent } from './logical/account.component';

const routes : Routes = [{
    path: '', component: NavigationParentComponent, children: [{
        path: '', component: AccountComponent
    }]
}]

@NgModule({
    imports: [ RouterModule.forChild(routes) ]
})
export class AccountUiRoutes {}