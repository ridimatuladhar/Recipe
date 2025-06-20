import express from 'express';
import { createRecipe, getAllRecipes, getRecipeByUserId, updateRecipe, deleteRecipe, searchRecipes, addToFavorites, removeFromFavorites, getFavorites, getRecipeById } from '../controllers/recipe.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/search', searchRecipes);

router.post('/:id/add', authenticate, createRecipe);
router.get('/', getAllRecipes);
router.get('/recipe/:id', getRecipeById);
router.get('/user/:userId', getRecipeByUserId);
router.put('/update/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);

router.get('/favorites/:userId', authenticate, getFavorites);
router.post('/favorites/:id', authenticate, addToFavorites);
router.delete('/favorites/:id', authenticate, removeFromFavorites);

export { router as recipeRoute };
