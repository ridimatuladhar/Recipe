import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import axios from 'axios';

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/recipes');
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to fetch recipes: ' + err.message);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const token = localStorage.getItem('adminToken'); // Assuming the token is stored in localStorage
        await axios.delete(`http://localhost:3000/api/admin/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      } catch (err) {
        setError('Failed to delete recipe: ' + err.message);
      }
    }
  };

  return (
    <div className="manage-recipes">
      <AdminNav />
      <div className="dashboard-content">
        <h3>Manage Recipes</h3>
        {error && <p className="error">{error}</p>}
        <table className="recipe-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Ingredients</th>
              <th>Steps</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.length > 0 ? (
              recipes.map(recipe => (
                <tr key={recipe._id}>
                  <td>
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                  </td>
                  <td>{recipe.title}</td>
                  <td>{recipe.desc}</td>
                  <td>{recipe.ingredients.join(', ')}</td>
                  <td>{recipe.steps.join(', ')}</td>
                  <td>{recipe.tags.join(', ')}</td>
                  <td>
                    <button onClick={() => handleDelete(recipe._id)} className="btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No recipes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRecipe;
