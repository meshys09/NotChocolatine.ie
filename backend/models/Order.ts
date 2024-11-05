import { User } from "./User";

export class Order {
    private id: number;
    private date: Date;
    private price: number;
    private userId: number | null;

    constructor(id: number, date: Date, price: number, userId: number) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.userId = userId;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getDate(): Date {
        return this.date;
    }

    public getPrice(): number {
        return this.price;
    }

    public getUserId(): number | null {
        return this.userId;
    }

    // Setters
    public setDate(date: Date): void {
        this.date = date;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public setUserId(userId: number): void {
        this.userId = userId;
    }
}