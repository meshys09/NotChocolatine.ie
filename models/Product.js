export class Product {
    constructor(id, price, name, description) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.description = description;
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
}
