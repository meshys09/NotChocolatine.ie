var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield prisma.reviews.findMany();
            const reviewList = yield Promise.all(reviews.map((review) => __awaiter(this, void 0, void 0, function* () {
                const user = yield userService.getUserById(review.userId);
                const product = yield productService.getProductById(review.productId);
                return new Review(review.id, review.comment, review.grade, user, product);
            })));
            return reviewList;
        });
    }
    ;
    getReviewById(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield prisma.reviews.findUnique({
                where: {
                    id: reviewId,
                }
            });
            if (!review) {
                throw new Error(`Commentaire avec l'ID ${reviewId} non trouvé.`);
            }
            const user = yield userService.getUserById(review.userId);
            const product = yield productService.getProductById(review.productId);
            return new Review(review.id, review.comment, review.grade, user, product);
        });
    }
    ;
    getReviewsByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield prisma.reviews.findMany({
                where: {
                    productId: productId,
                }
            });
            const reviewList = yield Promise.all(reviews.map((review) => __awaiter(this, void 0, void 0, function* () {
                const user = yield userService.getUserById(review.userId);
                const product = yield productService.getProductById(review.productId);
                return new Review(review.id, review.comment, review.grade, user, product);
            })));
            return reviewList;
        });
    }
    ;
    getReviewsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield prisma.reviews.findMany({
                where: {
                    userId: userId,
                }
            });
            const reviewList = yield Promise.all(reviews.map((review) => __awaiter(this, void 0, void 0, function* () {
                const user = yield userService.getUserById(review.userId);
                const product = yield productService.getProductById(review.productId);
                return new Review(review.id, review.comment, review.grade, user, product);
            })));
            return reviewList;
        });
    }
    ;
    addReview(reviewComment, reviewGrade, userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield prisma.reviews.create({
                data: {
                    comment: reviewComment,
                    grade: reviewGrade,
                    userId: userId,
                    productId: productId,
                }
            });
            const user = yield userService.getUserById(review.userId);
            const product = yield productService.getProductById(review.productId);
            return new Review(review.id, review.comment, review.grade, user, product);
        });
    }
    ;
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield prisma.reviews.delete({
                where: {
                    id: reviewId,
                }
            });
            return "Review deleted";
        });
    }
    ;
}
