import { User } from "./User";
import { Product } from "./Product";

export class Order {
    private id: number;
    private date: Date;
    private price: number;
    private user: User;
    private products: Product[];

    constructor(id: number, date: Date, price: number, user: User, products: Product[]) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.user = user;
        this.products = products;
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

    public getProducts(): Product[] {
        return this.products;
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

    public setProducts(products: Product[]): void {
        this.products = products;
    }
}