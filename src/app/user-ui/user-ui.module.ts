import { NgModule } from '@angular/core';
import { UserComponent } from './logical/user-component';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { UserUiRoutes } from './user-ui.routes';

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        SharedUiModule,
        UserUiRoutes
    ]
})
export class UserUiModule { }