import { NgModule } from '@angular/core';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { HomeComponent } from './logical/home.component';
import { HomeUiRoutes } from './home-ui.routes';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedUiModule,
        HomeUiRoutes
    ]
})
export class HomeUiModule {
}