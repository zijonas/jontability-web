import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../account/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  private serverUrl = 'http://localhost:8080/account'
  
  accounts: Account[];
  observers = [];
  
  delete(id: number) {
    this.httpClient.delete(this.serverUrl + '/' + id)
    .subscribe(() => {
      let index = this.accounts.findIndex(i => i.id == id);
      this.accounts.splice(index, 1);
      this.notifyAll();;
    });
  }
  
  add(account: Account) {
    this.httpClient.post<Account>(this.serverUrl, account)
    .subscribe((acc) => {
      let index = this.accounts.findIndex(i => i.id == account.id);
      account.id != undefined ? this.accounts[index] = acc : this.accounts.push(acc);
      this.notifyAll();
    });
  }
  
  register(observer: (observable: Account[]) => void) {
    this.observers.push(observer);
    if(this.accounts) {
      observer(this.accounts);
    } else {
      this.loadAll();
    }
  }
  
  private loadAll() {
    this.httpClient.get<Account[]>(this.serverUrl)
      .subscribe((acc) => {
        this.accounts = acc;
        this.notifyAll();
      });
  }
  
  private notifyAll() { 
    this.observers.forEach(item => item(this.accounts));
  }
}
