import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/security/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  template: `
    <input matInput [(ngModel)]="username" type="text" placeholder="User" name="user" />
    <input matInput [(ngModel)]="password" type="text" placeholder="Senha" name="senha" />
    <button mat-raised-button color="primary" (click)="submit()" value="dale">Dale</button>
  `
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/home';
  }

  submit() {
    this.authenticationService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          alert('NO Way man');
        }
      );
  }

}
