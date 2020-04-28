import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-ui/home-ui.module').then(m => m.HomeUiModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./category-ui/category.component').then(c => c.CategoryComponent),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'posts',
  //   loadChildren: () => import('./post-ui/post.component').then(p => p.PostComponent),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'accounts',
  //   loadChildren: () => import('./account-ui/account.component').then(a => a.AccountComponent),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard-ui/dashboard.component').then(d => d.DashboardComponent),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'login',
    loadChildren: () => import('./login-ui/login-ui.module').then(l => l.LoginUiModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
