export class BaseEntity {
    id: number;
}

export class BaseContainer {
    entities: BaseEntity[];
    amount: number;
    error: string;
}