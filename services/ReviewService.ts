import { PrismaClient } from "@prisma/client";
import { Review } from "../models/Review.js";

const prisma = new PrismaClient();

export class ReviewService {
    //Ici, il faudrait se metre d'accord : est-ce qu'on stocke le userId et productId ou un User et un Product ? 
    //(le constructeur prend des objets alors que l'objet dans prisma a des Id)
    //jpense il faudrait mettre les Id, c'est mieux

    //D'ailleurs, c'est pas dans l'api mais est-ce qu'on peut récup les reviews by id et toutes les reviews?
    
    async getAllReviews(): Promise<Review[]> {
        const reviews = await prisma.reviews.findMany();
        const reviewList = reviews.map(
            (review) => new Review(review.id, review.comment, review.grade, review.userId, review.productId)
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

        return new Review(review.id, review.comment, review.grade, review.userId, review.productId)
    };

    async getReviewsByProduct(productId : number): Promise<Review[]> {
        const reviews = await prisma.reviews.findMany({
            where:{
                productId:productId,
            }
        });
        const reviewList = reviews.map(
            (review) => new Review(review.id, review.comment, review.grade, review.userId, review.productId)
        );
        return reviewList;
    };

    async getReviewsByUser(userId : number): Promise<Review[]> {
        const reviews = await prisma.reviews.findMany({
            where:{
                userId:userId,
            }
        });
        const reviewList = reviews.map(
            (review) => new Review(review.id, review.comment, review.grade, review.userId, review.productId)
        );
        return reviewList;
    };

    async addReview(reviewId : number, reviewComment : string | null, reviewGrade : number|null, userId : number, productId : number): Promise<Review> {
        const existingReview = await prisma.reviews.findMany({
            where: {
                productId : productId,
                userId : userId,
            }
        });
        if (existingReview) {
            throw new Error(`L'utilisateur avec l'ID ${userId} a déjà écrit un commentaire pour le produit ${productId}`);
        };
        
        const review = await prisma.reviews.create({
            data: {
                comment : reviewComment,
                grade: reviewGrade,
                userId : userId,
                productId : productId,
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