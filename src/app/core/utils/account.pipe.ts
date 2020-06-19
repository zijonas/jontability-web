import { Pipe, PipeTransform } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../model/account';

@Pipe({
  name: 'account'
})
export class AccountPipe implements PipeTransform {

  accounts: Account[];

  constructor(private accountService: AccountService) {
    this.accountService.register(this.init.bind(this));
  }

  init(accs: Account[]) {
    this.accounts = accs
  }

  transform(value: number, ...args: any[]): string {
    return this.accounts.find(i => i.id == value).name;
  }

}
