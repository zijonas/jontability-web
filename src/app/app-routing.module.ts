import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'categories', component: CategoryComponent },
  { path: 'posts', component: PostComponent },
  { path: 'accounts', component: AccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
