export class Review {
    constructor(id, comment, grade, user, product) {
        this.id = id;
        this.comment = comment;
        this.grade = grade;
        this.user = user;
        this.product = product;
    }
    // Getters
    getId() {
        return this.id;
    }
    getComment() {
        return this.comment;
    }
    getGrade() {
        return this.grade;
    }
    getUser() {
        return this.user;
    }
    getProduct() {
        return this.product;
    }
    // Setters
    setComment(comment) {
        this.comment = comment;
    }
    setGrade(grade) {
        this.grade = grade;
    }
    setUser(user) {
        this.user = user;
    }
    setProduct(product) {
        this.product = product;
    }
}
