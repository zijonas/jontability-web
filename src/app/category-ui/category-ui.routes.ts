import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationParentComponent } from '../shared-ui/presentational/navigation-parent.component';
import { CategoryComponent } from './logical/category.component';

const routes: Routes = [{
    path: '', component: NavigationParentComponent, children: [{
        path: '', component: CategoryComponent
    }]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class CategoryUiRoutes { }