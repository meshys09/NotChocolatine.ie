export class OrderProduct {
    constructor(order, product, quantity) {
        this.order = order;
        this.product = product;
        this.quantity = quantity;
    }
    //Getters   
    getOrder() {
        return this.order;
    }
    ;
    getProduct() {
        return this.product;
    }
    ;
    getQuantity() {
        return this.quantity;
    }
    ;
    //Setters
    setOrder(order) {
        this.order = order;
    }
    ;
    setProduct(product) {
        this.product = product;
    }
    ;
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    ;
}
