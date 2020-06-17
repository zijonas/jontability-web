import { NgModule } from '@angular/core';
import { SharedUiModule } from '../shared-ui/shared-ui.module';
import { PostComponent } from './logical/post.component';
import { PostUiRoutes } from './post-ui.routes';
import { PostList } from './presentational/post-list';

const components = [
    PostList,
    PostComponent
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        SharedUiModule,
        PostUiRoutes
    ],
    exports: [
        ...components
    ]
})
export class PostUiModule { }