import { Component } from '@angular/core';
import { BaseComponent } from '../../core/base/baseComponent';
import { Account } from '../../core/model/account';
import { AccountService } from '../../core/services/account.service';

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
