import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
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
    this.accountService.register(((acc: Account[]) => this.accounts = acc).bind(this));
  }

  add() {
    this.accountService.add(this.account);
    this.account = new Account();
  }

  delete() {
    this.accountService.delete(this.account.id);
    this.account = new Account()
  }

  clear() {
    this.account = new Account();
  }

  onSelect(id: number) {
    this.account = this.accounts.find(i => i.id == id);
  }
}
