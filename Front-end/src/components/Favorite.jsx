import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Favorite = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/favorites/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setFavorites(response.data);
      }
        
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, token]);

  const viewRecipeDetails = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/recipes/favorites/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Recipe removed from favorites");
      setFavorites(favorites.filter(recipe => recipe._id !== id));
    } catch (err) {
      console.log('Error removing favorite');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer />
      <div>
        {favorites.length > 0 ? (
         
          <div className="recipe-gallery-container">
            {favorites.map(recipe => (
              <div key={recipe._id} className="recipe-item-container">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-item-image"
                  onClick={() => viewRecipeDetails(recipe._id)}
                />
                <div onClick={() => viewRecipeDetails(recipe._id)}>
                  <h4 className="recipe-item-title">{recipe.title}</h4>
                  <p className="recipe-item-desc">{recipe.desc}</p>
                </div>
                <div className="recipe-item-actions">
                  <button onClick={() => handleRemoveFavorite(recipe._id)} className="btn mx-2">Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no favorites yet.</p>
        )}
      </div>
    </>
  );
};

export default Favorite;
