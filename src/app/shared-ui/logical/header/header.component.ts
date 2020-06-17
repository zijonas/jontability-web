import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { AuthenticationService } from '../../../core/security/authentication.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account.service';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-header',
  template: `
      <div class="header">
        <div class="left">
          <nav>
              <a routerLink="/home">
                  <div class="title">
                      {{title}}
                  </div>
              </a>
          </nav>
          <status-panel [accountsAmount]="accountService.amount" [categoriesAmount]="categoryService.amount"></status-panel>
        </div>
        <div class="right">
          <div>
            {{activeUser}}
          </div>
          <button mat-icon-button>
            <mat-icon aria-hidden="false" color="accent" (click)="logout()">logout</mat-icon>
          </button>
        </div>
      </div>
  `
})
export class HeaderComponent implements OnInit {

  constructor(private appComponent: AppComponent,
    private authenticationService: AuthenticationService,
    private router: Router,
    private accountService: AccountService,
    private categoryService: CategoryService) {
    }

  title = this.appComponent.title;
  activeUser: string;

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.activeUser = currentUser.username;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
