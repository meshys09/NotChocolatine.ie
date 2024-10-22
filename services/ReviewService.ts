import { PrismaClient } from "@prisma/client";
import { Review } from "../models/Review.js";
import { UserService } from "./UserService.js";
import { ProductService } from "./ProductService.js";

const prisma = new PrismaClient();
const userService = new UserService();
const productService = new ProductService();
export class ReviewService {
    //Ici, il faudrait se metre d'accord : est-ce qu'on stocke le userId et productId ou un User et un Product ? 
    //(le constructeur prend des objets alors que l'objet dans prisma a des Id)
    //jpense il faudrait mettre les Id, c'est mieux

    //D'ailleurs, c'est pas dans l'api mais est-ce qu'on peut récup les reviews by id et toutes les reviews?

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
            throw new Error(`Commentaire avec l'ID ${reviewId} non trouvé.`);
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
        const reviewList = reviews.map(
            (review) => new Review(review.id, review.comment, review.grade, review.userId, review.productId)
        );
        return reviewList;
    };

    async getReviewsByUser(userId: number): Promise<Review[]> {
        const reviews = await prisma.reviews.findMany({
            where: {
                userId: userId,
            }
        });
        const reviewList = reviews.map(
            (review) => new Review(review.id, review.comment, review.grade, review.userId, review.productId)
        );
        return reviewList;
    };

    async addReview(reviewComment: string | null, reviewGrade: number | null, userId: number, productId: number): Promise<Review> {
        const existingReview = await prisma.reviews.findMany({
            where: {
                productId: productId,
                userId: userId,
            }
        });
        if (existingReview) {
            throw new Error(`L'utilisateur avec l'ID ${userId} a déjà écrit un commentaire pour le produit ${productId}`);
        };

        const review = await prisma.reviews.create({
            data: {
                comment: reviewComment,
                grade: reviewGrade,
                userId: userId,
                productId: productId,
            }
        })
        return new Review(review.id, review.comment, review.grade, review.userId, review.productId);
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