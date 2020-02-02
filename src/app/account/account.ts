export class Account {
    id: number;
    name: string;
    type: AccountType;
}

export enum AccountType {
	INVOICE,
	PAYMENT
}