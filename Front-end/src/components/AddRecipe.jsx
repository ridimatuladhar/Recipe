import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const navigate = useNavigate()
  const {addRecipe} = useContext(AppContext)

  const [formData, setformData] = useState({
    title :"", desc:"", image:"", ingredients:[], steps:[], tags:[], ctime:"", ptime:"", servings:"",
  })

  const onChangeHandler = (e) => {
    const {name ,value} = e.target
    setformData({...formData, [name]: value})
  }

  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    const {title, desc, image, ingredients, steps, tags, ctime, ptime, servings} = formData

    // Convert comma-separated strings to arrays
    const ingredientsArray = ingredients.split(',').map(item => item.trim());
    const stepsArray = steps.split(',').map(item => item.trim());
    const tagsArray = tags.split(',').map(item => item.trim());

    const result = await addRecipe(
      title,
      desc,
      image,
      ingredientsArray,
      stepsArray,
      tagsArray,
      parseInt(ctime),
      parseInt(ptime),
      parseInt(servings)
    );
    if (result.success) {
      toast.success("Recipe successfully added");
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      toast.error(result.message);
    }
  };
  
 
  return (
    <div>
      <ToastContainer />
      <form className='form-recipe' onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Recipe Title</label>
          <input value={formData.title} onChange={onChangeHandler} name='title' type="text" className="form-control" id="title" placeholder="Enter recipe title" required />
        </div>

        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Short description</label>
          <textarea value={formData.desc} onChange={onChangeHandler} name='desc'  className="form-control" id="desc" rows="3" placeholder="Enter a short description" required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input value={formData.image} onChange={onChangeHandler} name='image' type="text" className="form-control" id="image" placeholder="Enter image URL" />
        </div>

        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          <textarea value={formData.ingredients} onChange={onChangeHandler} name='ingredients' className="form-control" id="ingredients" rows="4" placeholder="Enter ingredients, separated by commas" required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="steps" className="form-label">Steps</label>
          <textarea value={formData.steps} onChange={onChangeHandler} name='steps' className="form-control" id="steps" rows="5" placeholder="Enter the cooking steps, separated by commas" required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input value={formData.tags} onChange={onChangeHandler} name='tags' type="text" className="form-control" id="tags" placeholder="Enter tags, separated by commas" required />
        </div>

        <div className="mb-3">
          <label htmlFor="ctime" className="form-label">Cooking Time (minutes)</label>
          <input value={formData.ctime} onChange={onChangeHandler} name='ctime' type="number" className="form-control" id="ctime" placeholder="Enter cooking time" required />
        </div>

        <div className="mb-3">
          <label htmlFor="ptime" className="form-label">Preparation Time (minutes)</label>
          <input value={formData.ptime} onChange={onChangeHandler} name='ptime' type="number" className="form-control" id="ptime" placeholder="Enter preparation time" required />
        </div>

        <div className="mb-3">
          <label htmlFor="servings" className="form-label">Servings</label>
          <input value={formData.servings} onChange={onChangeHandler} name='servings' type="number" className="form-control" id="servings" placeholder="Enter number of servings" required />
        </div>

        <div className="btn-submit">
          <button type="submit" className="btn mx-2">Submit Recipe</button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipe
