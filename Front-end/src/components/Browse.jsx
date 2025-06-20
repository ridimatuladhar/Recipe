import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Browse = () => {
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]); 
    const navigate = useNavigate();
    const userID = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/recipes/", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                setRecipes(response.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while fetching recipes");
            }
        };

        const fetchFavorites = async () => {
            if (!userID || !token) return;
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/recipes/favorites/${userID}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
                setFavorites(response.data);
            } catch (error) {
            }
        };

        fetchRecipes();
        fetchFavorites(); 
    }, []);

    const isFavorite = (recipeID) => {
        return favorites.some(favorite => favorite._id === recipeID);
    };

    const favorite = async (recipeID) => {
        
        if (!userID || !token) {
            toast.info("You need to be logged in to favorite a recipe.");
            return;
        }
        try {
            if (isFavorite(recipeID)) {
                toast.info("This recipe is already in your favorites.");
                return;
            }

            const response = await axios.post(
                `http://localhost:3000/api/recipes/favorites/${recipeID}`,
                { recipeID, userID },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, 
                    },
                    withCredentials: true,
                }
            );

            setFavorites([...favorites, response.data]); 
            toast.success("Recipe added to favorites.");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred while adding to favorites");
        }
    };

    const viewRecipeDetails = (recipe_id) => {
        navigate(`/recipe/${recipe_id}`);  
    };

    return (
        <>
            <ToastContainer />
            <div className="gallery-container">
                {recipes.map((recipe) => (
                    <div className="recipe-item" key={recipe._id}>
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            onClick={() => viewRecipeDetails(recipe._id)}
                            role="button"
                            tabIndex={0}
                        />
                        <div className="recipe-content">
                            <h4
                                className="recipe-title"
                                onClick={() => viewRecipeDetails(recipe._id)}
                                role="button"
                                tabIndex={0}
                            >
                                {recipe.title}
                            </h4>
                            <p
                                className="recipe-desc"
                                onClick={() => viewRecipeDetails(recipe._id)}
                                role="button"
                                tabIndex={0}
                            >
                                {recipe.desc}
                            </p>
                            <button
                                className="btn mx-2"
                                onClick={() => favorite(recipe._id)}
                            >
                                {isFavorite(recipe._id) ? 'Favorited' : 'Favorite'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Browse;
