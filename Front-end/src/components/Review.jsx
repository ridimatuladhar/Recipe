import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Review = ({ recipeId, onClose }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const token = localStorage.getItem('access_token');
        const userId = localStorage.getItem('user_id')

        if (!userId || !token) {
            toast.info("You need to be logged in to leave a review.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/reviews/${recipeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ rating, comment })
               
            });
            if (response.ok) {
                toast.success('Review submitted successfully');
                navigate(`/recipe/${recipeId}`);
                onClose();
            } else {
                const data = await response.json();
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('An error occurred while submitting the review');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="review-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="rating">Rating (1-5):</label>
                        <input
                            type="number"
                            id="rating"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Submit Review</button>
                    <button type="button" onClick={onClose} className="btn">Cancel</button>
                </form>
            </div>
        </>
    );
};

export default Review;
