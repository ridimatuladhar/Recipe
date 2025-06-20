import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/profile/:userId', authenticate, getProfile); 
router.put('/profile/:userId', authenticate, updateProfile);

export { router as userRoute };
