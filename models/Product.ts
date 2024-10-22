export class Product {
    private id: number;
    private price: number;
    private name: string;
    private description: string|null;

    constructor(id: number, price: number, name: string, description: string| null) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.description = description;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getPrice(): number {
        return this.price;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string|null {
        return this.description;
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
}