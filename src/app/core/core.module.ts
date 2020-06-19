import { NgModule, ModuleWithProviders } from '@angular/core';
import { CategoryPipe } from './utils/category.pipe';
import { MonthPipe } from './utils/month.pipe';
import { AccountPipe } from './utils/account.pipe';


const declarations = [
    MonthPipe,
    CategoryPipe,
    AccountPipe
];


@NgModule({
    declarations: [
        ...declarations
    ],
    exports: [
        ...declarations
    ]
})
export class CoreModule {
}
