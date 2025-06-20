import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {}; 
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe || {
    title: '',
    desc: '',
    image: '',
    ingredients: '',
    steps: '',
    tags: '',
    ctime: '',
    ptime: '',
    servings: ''
  });

  // Update state when recipe prop changes
  useEffect(() => {
    if (recipe) {
      setUpdatedRecipe(recipe);
    }
  }, [recipe]);

  const handleChange = (e) => {
    setUpdatedRecipe({
      ...updatedRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const accessToken = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/recipes/update/${recipe._id}`, updatedRecipe, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      toast.success('Recipe updated successfully!'); // Show success toast
      setTimeout(() => {
        navigate(`/user/${user_id}`);
      }, 1500); 
    } catch (error) {
      toast.error('Error updating recipe. Please try again.'); // Show error toast
    }
  };
  

  return (
    <div>
        
      <h4 className='update'>Update Recipe</h4>
      <form className='form-recipe' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Recipe Title</label>
          <input 
            value={updatedRecipe.title} 
            onChange={handleChange} 
            name='title' 
            type="text" 
            className="form-control" 
            id="title" 
            placeholder="Enter recipe title" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Short description</label>
          <textarea 
            value={updatedRecipe.desc} 
            onChange={handleChange} 
            name='desc' 
            className="form-control" 
            id="desc" 
            rows="3" 
            placeholder="Enter a short description" 
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input 
            value={updatedRecipe.image} 
            onChange={handleChange} 
            name='image' 
            type="text" 
            className="form-control" 
            id="image" 
            placeholder="Enter image URL" 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          <textarea 
            value={updatedRecipe.ingredients} 
            onChange={handleChange} 
            name='ingredients' 
            className="form-control" 
            id="ingredients" 
            rows="4" 
            placeholder="Enter ingredients, separated by commas" 
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="steps" className="form-label">Steps</label>
          <textarea 
            value={updatedRecipe.steps} 
            onChange={handleChange} 
            name='steps' 
            className="form-control" 
            id="steps" 
            rows="5" 
            placeholder="Enter the cooking steps, separated by commas" 
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input 
            value={updatedRecipe.tags} 
            onChange={handleChange} 
            name='tags' 
            type="text" 
            className="form-control" 
            id="tags" 
            placeholder="Enter tags, separated by commas" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ctime" className="form-label">Cooking Time (minutes)</label>
          <input 
            value={updatedRecipe.ctime} 
            onChange={handleChange} 
            name='ctime' 
            type="number" 
            className="form-control" 
            id="ctime" 
            placeholder="Enter cooking time" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ptime" className="form-label">Preparation Time (minutes)</label>
          <input 
            value={updatedRecipe.ptime} 
            onChange={handleChange} 
            name='ptime' 
            type="number" 
            className="form-control" 
            id="ptime" 
            placeholder="Enter preparation time" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="servings" className="form-label">Servings</label>
          <input 
            value={updatedRecipe.servings} 
            onChange={handleChange} 
            name='servings' 
            type="number" 
            className="form-control" 
            id="servings" 
            placeholder="Enter number of servings" 
            required 
          />
        </div>

        <div className="btn-submit">
          <button type="submit" className="btn btn-primary">Update Recipe</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateRecipe;
