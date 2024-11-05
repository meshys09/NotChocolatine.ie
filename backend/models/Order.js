export class Order {
    constructor(id, date, price, userId) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.userId = userId;
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
    getUserId() {
        return this.userId;
    }
    // Setters
    setDate(date) {
        this.date = date;
    }
    setPrice(price) {
        this.price = price;
    }
    setUserId(userId) {
        this.userId = userId;
    }
}
