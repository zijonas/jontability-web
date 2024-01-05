import { NgModule } from '@angular/core';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { HomeComponent } from './logical/home.component';
import { HomeUiRoutes } from './home-ui.routes';
import { DashboardComponent } from '../dashboard-ui/dashboard.component';
import { DashboardModule } from '../dashboard-ui/dashboard.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedUiModule,
        HomeUiRoutes,
        DashboardModule
    ]
})
export class HomeUiModule {
}