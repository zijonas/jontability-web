import { BaseEntity } from '../base/baseEntity';

export class Account extends BaseEntity {
    name: string;
    type: AccountType;
}

export enum AccountType {
	INVOICE,
	PAYMENT
}