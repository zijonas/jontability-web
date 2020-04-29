import { NgModule } from '@angular/core';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { CategoryComponent } from './logical/category.component';
import { CategoryUiRoutes } from './category-ui.routes';

@NgModule({
    declarations: [
        CategoryComponent
    ],
    imports: [
        SharedUiModule,
        CategoryUiRoutes
    ]
})
export class CategoryUiModule { }