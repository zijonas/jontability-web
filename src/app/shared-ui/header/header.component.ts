import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import {AuthenticationService} from '../../core/security/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private appComponent: AppComponent,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  title = this.appComponent.title;
  activeUser: string;

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser) {
      this.activeUser = currentUser.username;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
