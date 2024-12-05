var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Hono } from "hono";
import { ReviewService } from "../services/ReviewService.js";
const reviewController = new Hono();
const reviewService = new ReviewService();
reviewController.get('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewList = yield reviewService.getAllReviews();
        return yield c.json(reviewList);
    }
    catch (error) {
        return c.json({ error: 'Failed to retrieve reviews', details: error.message }, 500);
    }
}));
reviewController.get('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = parseInt(c.req.param('id'), 10);
        const review = yield reviewService.getReviewById(reviewId);
        return c.json(review);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
reviewController.get('/byProduct/:productId', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(c.req.param('productId'), 10);
        const reviewList = yield reviewService.getReviewsByProduct(productId);
        return c.json(reviewList);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
reviewController.get('/byUser/:userId', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(c.req.param('userId'), 10);
        const reviewList = yield reviewService.getReviewsByUser(userId);
        return c.json(reviewList);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
reviewController.post('/', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, grade, userId, productId } = yield c.req.json();
        const review = yield reviewService.addReview(comment, grade, userId, productId);
        return c.json(review, 201);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
reviewController.delete('/:id', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = parseInt(c.req.param('id'), 10);
        const deleteReview = yield reviewService.deleteReview(reviewId);
        return c.json(deleteReview);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
reviewController.get('/averageGrade/:productId', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(c.req.param('productId'), 10);
        const average = yield reviewService.getAverageGrade(productId);
        return c.json(average);
    }
    catch (error) {
        return c.json({ message: error.message }, 404);
    }
}));
export default reviewController;
