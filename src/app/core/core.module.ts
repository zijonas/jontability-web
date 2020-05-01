import { NgModule, ModuleWithProviders } from '@angular/core';
import { CategoryPipe } from './utils/category.pipe';
import { MonthPipe } from './utils/month.pipe';



@NgModule({
    declarations: [
        CategoryPipe,
        MonthPipe
    ],
    exports: [
        MonthPipe,
        CategoryPipe
    ]
})
export class CoreModule {
}
