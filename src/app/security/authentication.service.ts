import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './model/User';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly key = 'currentUser';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.key)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>('/api/authenticate', {username, password})
      .pipe(map(user => {
        if (user && user.jwt) {
          localStorage.setItem(this.key, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }


  logout() {
    localStorage.removeItem(this.key);
    this.currentUserSubject.next(null);
  }

}
