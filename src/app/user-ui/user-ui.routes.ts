import { NgModule } from '@angular/core';
import { NavigationParentComponent } from '../shared-ui/presentational/navigation-parent.component';
import { UserComponent } from './logical/user-component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '', component: NavigationParentComponent, children: [{
        path: '', component: UserComponent
    }]
}];


@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class UserUiRoutes { }