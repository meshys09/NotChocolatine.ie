export class Product {
    constructor(id, price, name, description, stock) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.description = description;
        this.stock = stock;
    }
    // Getters
    getId() {
        return this.id;
    }
    getPrice() {
        return this.price;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getStock() {
        return this.stock;
    }
    // Setters
    setPrice(price) {
        this.price = price;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setStock(stock) {
        this.stock = stock;
    }
}
