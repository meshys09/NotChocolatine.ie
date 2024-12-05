import { Hono } from "hono";
import { ReviewService } from "../services/ReviewService.js";

const reviewController = new Hono();
const reviewService = new ReviewService();

reviewController.get('/', async (c) => {
    try {
        const reviewList = await reviewService.getAllReviews();
        return await c.json(reviewList);

    } catch (error: any) {
        return c.json({ error: 'Failed to retrieve reviews', details: error.message }, 500);
    }
});

reviewController.get('/:id', async (c) => {
    try {
        const reviewId = parseInt(c.req.param('id'), 10);
        const review = await reviewService.getReviewById(reviewId);
        return c.json(review);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

reviewController.get('/byProduct/:productId', async (c) => {
    try {
        const productId = parseInt(c.req.param('productId'), 10);
        const reviewList = await reviewService.getReviewsByProduct(productId);
        return c.json(reviewList);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

reviewController.get('/byUser/:userId', async (c) => {
    try {
        const userId = parseInt(c.req.param('userId'), 10);
        const reviewList = await reviewService.getReviewsByUser(userId);
        return c.json(reviewList);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

reviewController.post('/', async (c) => {
    try {
        const { comment, grade, userId, productId } = await c.req.json();
        const review = await reviewService.addReview(comment, grade, userId, productId);

        return c.json(review, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
})


reviewController.delete('/:id', async (c) => {
    try {
        const reviewId = parseInt(c.req.param('id'), 10);
        const deleteReview = await reviewService.deleteReview(reviewId);
        return c.json(deleteReview);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

reviewController.get('/averageGrade/:productId', async (c) => {
    try {
        const productId = parseInt(c.req.param('productId'), 10);
        const average = await reviewService.getAverageGrade(productId);
        return c.json(average);
    } catch (error: any) {
        return c.json({ message: error.message }, 404);
    }
});

export default reviewController;