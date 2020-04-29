import { NgModule } from '@angular/core';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { PostComponent } from './logical/post.component';
import { PostUiRoutes } from './post-ui.routes';

@NgModule({
    declarations: [
        PostComponent
    ],
    imports: [
        SharedUiModule,
        PostUiRoutes
    ]
})
export class PostUiModule { }