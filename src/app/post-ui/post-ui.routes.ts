import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationParentComponent } from '../shared-ui/presentational/navigation-parent.component';
import { PostComponent } from './logical/post.component';

const routes: Routes = [{
    path: '', component: NavigationParentComponent, children: [{
        path: '', component: PostComponent
    }]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class PostUiRoutes { }