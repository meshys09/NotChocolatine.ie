import { User } from "./User";
import { Product } from "./Product";

export class Order {
    private id: number;
    private date: Date;
    private price: number;
    private user: User;

    constructor(id: number, date: Date, price: number, user: User) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.user = user;
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

    public getUser(): User {
        return this.user;
    }

    // Setters
    public setDate(date: Date): void {
        this.date = date;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public setUser(user: User): void {
        this.user = user;
    }
}