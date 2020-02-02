import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../account/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  accounts: Observable<Account[]>;
  observers = [];
  private serverUrl = 'http://localhost:8080/restapi/account'

  loadAll() {
    this.accounts = this.httpClient.get<Account[]>(this.serverUrl);
    return this.accounts;
  }

  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
      .subscribe(this.notifyAll.bind(this));
  }

  add(account: Account) {
    this.httpClient.post(this.serverUrl, account)
      .subscribe(this.notifyAll.bind(this));
  }

  notifyAll() { this.observers.forEach((item) => item(this.loadAll())) }

  register(observer: (observable: Observable<Account[]>) => void) {
    this.observers.push(observer);
    observer(this.loadAll());
  }
}
