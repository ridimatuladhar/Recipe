import express from 'express'
import mongoose from 'mongoose'
import { authRoute } from './routes/authRoute.js';
import { recipeRoute } from './routes/recipeRoute.js';
import { groceryRoute } from './routes/groceryRoute.js';
import { adminRoute } from './routes/adminRoute.js';
import { userRoute } from './routes/userRoute.js';
import { reviewRoute } from './routes/reviewRoute.js';
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE", 'PATCH'],
    credentials:true
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/recipes', recipeRoute);
app.use('/api', groceryRoute);
app.use('/api', reviewRoute);

app.use('/api/user', userRoute);

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
})
.then(() => console.log("Connection to MongoDB successful"))
.catch((err) => console.log(err.message));

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))

