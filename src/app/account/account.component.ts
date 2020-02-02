import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { Account } from './account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  accounts: Account[];
  account: Account = new Account();

  ngOnInit() {
    this.accountService.register(this.load.bind(this));
  }

  load(observable: Observable<Account[]>) {
    observable.subscribe(acc => this.accounts = acc);
  }

  add() {
    this.accountService.add(this.account);
    this.account = new Account();
  }

  delete(id: number) { this.accountService.delete(id); }

}
