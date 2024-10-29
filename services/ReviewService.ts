import { PrismaClient } from "@prisma/client";
import { Review } from "../models/Review.js";
import { UserService } from "./UserService.js";
import { ProductService } from "./ProductService.js";

const prisma = new PrismaClient();
const userService = new UserService();
const productService = new ProductService();
export class ReviewService {
    async getAllReviews(): Promise<Review[]> {
        const reviews = await prisma.reviews.findMany();
        const reviewList = await Promise.all(
            reviews.map(
                async (review) => {
                    const user = await userService.getUserById(review.userId);
                    const product = await productService.getProductById(review.productId);

                    return new Review(review.id, review.comment, review.grade, user, product);
                }
            )
        );
        return reviewList;
    };

    async getReviewById(reviewId: number): Promise<Review> {
        const review = await prisma.reviews.findUnique({
            where: {
                id: reviewId,
            }
        });
        if (!review) {
            throw new Error(`Review ${reviewId} not found.`);
        }

        const user = await userService.getUserById(review.userId);
        const product = await productService.getProductById(review.productId);

        return new Review(review.id, review.comment, review.grade, user, product)
    };

    async getReviewsByProduct(productId: number): Promise<Review[]> {
        const reviews = await prisma.reviews.findMany({
            where: {
                productId: productId,
            }
        });
        const reviewList = await Promise.all(
            reviews.map(
                async (review) => {
                    const user = await userService.getUserById(review.userId);
                    const product = await productService.getProductById(review.productId);

                    return new Review(review.id, review.comment, review.grade, user, product);
                }
            )
        );
        return reviewList;
    };

    async getReviewsByUser(userId: number): Promise<Review[]> {
        const reviews = await prisma.reviews.findMany({
            where: {
                userId: userId,
            }
        });
        const reviewList = await Promise.all(
            reviews.map(
                async (review) => {
                    const user = await userService.getUserById(review.userId);
                    const product = await productService.getProductById(review.productId);
                    return new Review(review.id, review.comment, review.grade, user, product);
                }
            )
        );
        return reviewList;
    };

    async addReview(reviewComment: string | null, reviewGrade: number | null, userId: number, productId: number): Promise<Review> {
        const review = await prisma.reviews.create({
            data: {
                comment: reviewComment,
                grade: reviewGrade,
                userId: userId,
                productId: productId,
            }
        })
        const user = await userService.getUserById(review.userId);
        const product = await productService.getProductById(review.productId);

        return new Review(review.id, review.comment, review.grade, user, product);
    };

    async deleteReview(reviewId: number): Promise<string> {
        const review = await prisma.reviews.delete({
            where: {
                id: reviewId,
            }
        });
        return "Review deleted"
    };

}