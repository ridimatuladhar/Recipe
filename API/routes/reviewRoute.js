import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createReview, getReviews, deleteReview } from '../controllers/review.js';

const router = express.Router();


router.post('/reviews/:recipeId', authenticate, createReview);

router.get('/reviews/:recipeId', getReviews);

router.delete('/reviews/:reviewId/:recipeId', authenticate, deleteReview);

export { router as reviewRoute };
