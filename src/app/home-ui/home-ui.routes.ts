import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationParentComponent } from '../shared-ui/presentational/navigation-parent.component';
import { HomeComponent } from './logical/home.component';

const routes: Routes = [
    {
        path: '', component: NavigationParentComponent, children: [
            { path: '', component: HomeComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class HomeUiRoutes { }