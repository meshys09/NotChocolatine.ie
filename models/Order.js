export class Order {
    constructor(id, date, price, user) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.user = user;
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
}
