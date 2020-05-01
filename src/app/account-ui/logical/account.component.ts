import { Component } from '@angular/core';
import { BaseComponent } from '../../core/base/baseComponent';
import { Account } from '../../core/model/account';
import { AccountService } from '../../core/services/account.service';

@Component({
  template: `
    <div class="box">
      <h2 class="page-title">Contas</h2>
      <card-editor 
        (add)="add()"
        (delete)="delete()"
        (clear)="clear()"
        [entity]="entity">
      </card-editor>
      <card-list 
        [entity]="entity"
        [entities]="entities"
        (onSelect)="onSelect($event)">
      </card-list>
    </div>
  `
})
export class AccountComponent extends BaseComponent<Account> {
  constructor(accountService: AccountService) {
    super(accountService, Account);
  }
}
