import { Product } from "./Product";
import { User } from "./User";

export class Review {
    private id: number | null;
    private comment: string | null;
    private grade: number | null;
    private user: User;
    private product: Product;

    constructor(id: number, comment: string | null, grade: number | null, user: User, product: Product) {
        this.id = id;
        this.comment = comment;
        this.grade = grade;
        this.user = user;
        this.product = product;
    }

    // Getters
    public getId(): number | null {
        return this.id;
    }

    public getComment(): string | null {
        return this.comment;
    }

    public getGrade(): number | null {
        return this.grade;
    }

    public getUser(): User {
        return this.user;
    }

    public getProduct(): Product {
        return this.product;
    }

    // Setters

    public setComment(comment: string | null): void {
        this.comment = comment;
    }

    public setGrade(grade: number | null): void {
        this.grade = grade;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public setProduct(product: Product): void {
        this.product = product;
    }
}