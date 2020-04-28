import { NgModule } from '@angular/core';
import { HomeComponent } from '../home-ui/logical/home.component';
import { LoginComponent } from './logical/login.component';
import { LoginUiRoutes } from './login-ui.routes';
import { SharedUiModule } from '../shared-ui/shared-ui.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [ 
        LoginUiRoutes,
        SharedUiModule
     ]
})
export class LoginUiModule {}