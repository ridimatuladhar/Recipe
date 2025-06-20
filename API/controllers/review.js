import { Review } from '../Models/Review.js';
import { Recipe } from '../Models/Recipe.js';

export const createReview = async (req, res) => {
    const { rating, comment } = req.body;
    const { recipeId } = req.params;
    const userId = req.user._id;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const review = new Review({
            author: userId,
            rating,
            comment,
            recipe: recipeId
        });

        await review.save();

        recipe.reviews.push(review._id);
        await recipe.save();

        res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get all reviews for a specific recipe
export const getReviews = async (req, res) => {
    const { recipeId } = req.params;

    try {
        const reviews = await Review.find({ recipe: recipeId }).populate('author', 'name');
        
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this recipe' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteReview = async (req, res) => {
    const { reviewId, recipeId } = req.params;
    const userId = req.user._id;

    try {
        // Find the review by its ID
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the logged-in user is the author of the review
        if (!review.author.equals(userId)) {
            return res.status(403).json({ message: 'Unauthorized to delete this review' });
        }

        // Delete the review
        await Review.findByIdAndDelete(reviewId);

        // Remove the review from the recipe's reviews list
        await Recipe.findByIdAndUpdate(recipeId, { $pull: { reviews: reviewId } });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




