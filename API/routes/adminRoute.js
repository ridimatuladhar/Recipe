import express from 'express';
import { deleteUser, deleteRecipe, adminLogin, getAllRecipes, getAllUsers, getCounts } from '../controllers/admin.js';
import { auth } from '../middlewares/authenticate.js';

const router = express.Router();


router.post('/adminlogin', adminLogin);

router.get('/dashboard',auth, getCounts)

router.get('/users', auth, getAllUsers);
router.get('/recipes', auth, getAllRecipes);

router.delete('/users/:id', auth, deleteUser);
router.delete('/recipes/:id', auth, deleteRecipe);


export { router as adminRoute };

