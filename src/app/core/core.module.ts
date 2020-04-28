import { NgModule, ModuleWithProviders } from '@angular/core';
import { CategoryPipe } from './utils/category.pipe';
import { MonthPipe } from './utils/month.pipe';



@NgModule({
    declarations: [
        CategoryPipe,
        MonthPipe
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule
        }
    }
}
