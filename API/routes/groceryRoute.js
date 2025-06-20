import express from 'express';
import {addToGroceryList, getGroceryList, removeFromGroceryList, removeIngredientFromGroceryList, updateGroceryItem} from '../controllers/grocery.js'
import { authenticate } from '../middlewares/authenticate.js';


const router = express.Router();

// Add to grocery list 
router.post('/grocery/:userId', authenticate, addToGroceryList);

// Get user's grocery list 
router.get('/grocery/:userId', getGroceryList);

// Remove an item from grocery list 
router.delete('/grocery/:userId/:groceryListId', removeFromGroceryList);

router.patch('/grocery/:userId/:groceryListId/remove-ingredient', removeIngredientFromGroceryList);
// Update an existing grocery list with new ingredients
router.patch('/grocery/:userId/:groceryListId', updateGroceryItem);

export { router as groceryRoute };