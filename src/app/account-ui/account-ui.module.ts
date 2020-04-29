import { NgModule } from '@angular/core';
import { AccountComponent } from './logical/account.component';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { AccountUiRoutes } from './account-ui.routes'

@NgModule({
    declarations: [
        AccountComponent
    ],
    imports: [
        SharedUiModule,
        AccountUiRoutes
    ]
})
export class AccountUiModule { }