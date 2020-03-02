import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../account/account';
import { BaseService } from '../base/baseService';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService<Account>{

  protected serverUrl = 'http://localhost:8080/account'

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  compare(acc1: Account, acc2: Account): number {
    return acc1.name.localeCompare(acc2.name)
  }

}
