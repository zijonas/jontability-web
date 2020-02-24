import { Component } from '@angular/core';
import { BaseComponent } from '../base/baseComponent';
import { Account } from './account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseComponent<Account> {

  constructor(accountService: AccountService) {
    super(accountService, Account);
  }

}
