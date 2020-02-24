import { BaseEntity } from 'src/app/base/baseEntity';

export class Post extends BaseEntity {
    categoryId: number;
    accountId: number;
    description: string;
    invoice: boolean;
    date: Date;
    value: number;
}