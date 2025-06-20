import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import Review from './Review';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeDetail = () => {
    const { id } = useParams();
    const { fetchRecipe, fetchReviewsByRecipeId } = useContext(AppContext);
    const [recipe, setRecipe] = useState(null);
    const [showReviewPanel, setShowReviewPanel] = useState(false);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const getRecipeAndReviews = async () => {
            try {
                const recipeResponse = await fetchRecipe(id);
                if (recipeResponse && recipeResponse.data) {
                    setRecipe(recipeResponse.data);

                    const reviewsData = await fetchReviewsByRecipeId(id);
                    if (reviewsData) {
                        setReviews(reviewsData);
                    }
                } else {
                    console.error("Error: Invalid response format from fetchRecipe");
                }
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };

        getRecipeAndReviews();
    }, [id, fetchRecipe, fetchReviewsByRecipeId]);

    const handleLeaveReview = () => {
        setShowReviewPanel(true);
    };

    const handleCloseReviewPanel = () => {
        setShowReviewPanel(false);
    };

    const handleDeleteReview = async (reviewId) => {
        
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await axios.delete(`http://localhost:3000/api/reviews/${reviewId}/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        withCredentials: true
                    }
                });
                setReviews(reviews.filter(review => review._id !== reviewId));
                toast.success('Review deleted successfully!');
            } catch (error) {
                toast.error('Current user cannot delete this review.');
            }
        }
    };

    const handleAddToGrocery = async () => {
        if (!userId || !token) {
            toast.info("You need to be logged in.");
            return;
        }
        try {
            const groceryResponse = await axios.get(
                `http://localhost:3000/api/grocery/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const groceryList = groceryResponse.data;
            const existingRecipe = groceryList.find(item => item.recipeName === recipe.title);

            if (existingRecipe) {
                // Update existing ingredients
                const updatedIngredients = Array.from(new Set([...existingRecipe.ingredients, ...recipe.ingredients]));
                await axios.patch(
                    `http://localhost:3000/api/grocery/${userId}/${existingRecipe._id}`,
                    { ingredients: updatedIngredients },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                toast.success('Grocery list updated with new ingredients!');
            } else {
                // Create a new entry
                const response = await axios.post(
                    `http://localhost:3000/api/grocery/${userId}`,
                    {
                        recipeName: recipe.title,
                        ingredients: recipe.ingredients
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (response.status === 201) {
                    toast.success('Ingredients added to grocery list!');
                }
            }
        } catch (error) {
            console.error('Failed to add to grocery list:', error);
            toast.error('Failed to add ingredients to grocery list.');
        }
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-container">
            <ToastContainer />
            <div className="recipe-detail-content">
                <h1>{recipe.title}</h1>
                <p>Cooking Time: {recipe.ctime} minutes</p>
                <p>Preparation Time: {recipe.ptime} minutes</p>
                <p>Servings: {recipe.servings}</p>
                <p>Tags: {recipe.tags.join(', ')}</p>
                <p>{recipe.desc}</p>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <button className='btn mx-2' onClick={handleAddToGrocery}>Add to Grocery</button>
                <h3>Steps</h3>
                <ol>
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
                <div className="review-container">
                    <h3>Reviews</h3>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review._id}>
                                    <p><strong>{review.author ? review.author.name : 'Anonymous'}</strong></p>
                                    <p>{review.comment}</p>
                                    <button className='btn-delete mx-2' onClick={() => handleDeleteReview(review._id)}>
                                        Delete Review
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                    <button className='btn mx-2' onClick={handleLeaveReview}>Leave a review</button>
                </div>
            </div>
            <div className="recipe-detail-image">
                <img src={recipe.image} alt={recipe.title} />
                <button className='btn mx-2'><i className="fa-solid fa-share"></i></button>
            </div>
            {showReviewPanel && (
                <div className="review-panel-overlay">
                    <div className="review-panel">
                        <Review recipeId={id} onClose={handleCloseReviewPanel} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipeDetail;
