import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MonthPipe} from './utils/month.pipe';
import {CategoryPipe} from './utils/category.pipe';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoryComponent} from './category/category.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {AccountComponent} from './account/account.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {ImportsModule} from './imports/imports.module';
import {LoginComponent} from './login/login.component';
import {JwtInterceptor} from './security/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    AccountComponent,
    MonthPipe,
    CategoryPipe,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ImportsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
