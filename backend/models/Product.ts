export class Product {
    private id: number | null;
    private price: number;
    private name: string;
    private description: string | null;
    private stock: number;

    constructor(id: number | null, price: number, name: string, description: string | null, stock: number) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.description = description;
        this.stock = stock;

    }

    // Getters
    public getId(): number | null {
        return this.id;
    }

    public getPrice(): number {
        return this.price;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string | null {
        return this.description;
    }

    public getStock(): number {
        return this.stock;
    }

    // Setters
    public setPrice(price: number): void {
        this.price = price;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }
}