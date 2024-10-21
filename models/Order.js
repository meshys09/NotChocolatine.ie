export class Order {
    constructor(id, date, price, user, products) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.user = user;
        this.products = products;
    }
    // Getters
    getId() {
        return this.id;
    }
    getDate() {
        return this.date;
    }
    getPrice() {
        return this.price;
    }
    getUser() {
        return this.user;
    }
    getProducts() {
        return this.products;
    }
    // Setters
    setDate(date) {
        this.date = date;
    }
    setPrice(price) {
        this.price = price;
    }
    setUser(user) {
        this.user = user;
    }
    setProducts(products) {
        this.products = products;
    }
}
