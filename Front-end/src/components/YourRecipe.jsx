import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const YourRecipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/recipes/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred while fetching recipes");
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [userId]);

  const handleAddRecipe = () => {
    navigate('/add');
  };

  const handleEditRecipe = (recipe) => {
    navigate('/update', { state: { recipe } });
  };

  const viewRecipeDetails = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleDeleteRecipe = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      try {
        const accessToken = localStorage.getItem("access_token");
        await axios.delete(`http://localhost:3000/api/recipes/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred while deleting the recipe");
      }
    }
  };

  return (
    <div>
      <div className="header-action">
        <button onClick={handleAddRecipe} className="btn mx-2" id='new'>
          Add New Recipe
        </button>
        {loading && <p>Loading...</p>}
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className="recipe-gallery-container">
          {recipes.length === 0 ? (
            <p>No recipes found</p>
          ) : (
            recipes.map(recipe => (
              <div key={recipe._id} className="recipe-item-container">
                <img src={recipe.image} alt={recipe.title} className="recipe-item-image" onClick={() => viewRecipeDetails(recipe._id)} />
                <div onClick={() => viewRecipeDetails(recipe._id)}>
                  <h4 className="recipe-item-title">{recipe.title}</h4>
                  <p className="recipe-item-desc">{recipe.desc}</p>
                </div>
                <div className="recipe-item-actions">
                  <button onClick={() => handleEditRecipe(recipe)} className="btn mx-2">Edit</button>
                  <button onClick={() => handleDeleteRecipe(recipe._id)} className="btn mx-2">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default YourRecipe;
