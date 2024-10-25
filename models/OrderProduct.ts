import { Order } from "./Order";
import { Product } from "./Product";

export class OrderProduct {
    private order: Order;
    private product: Product;
    private quantity: number;

    constructor(order: Order, product: Product, quantity: number) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
    }

    //Getters   
    public getOrder(): Order {
        return this.order;
    };

    public getProduct(): Product {
        return this.product;
    };

    public getQuantity(): number {
        return this.quantity;
    };

    //Setters

    public setOrder(order: Order): void {
        this.order = order;
    };

    public setProduct(product: Product): void {
        this.product = product;
    };

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    };
}