import mongoose from "mongoose";
import { Review } from "./Review.js";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        require: true,
    },
    steps: {
        type: [String],
        require: true,
    },
    tags: {
        type: [String],
        require: true,
    },
    ctime: {
        type: Number,
        require: true,
    },
    ptime: {
        type: Number,
        require: true,
    },
    servings: {
        type: Number,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ]
})

export const Recipe = mongoose.model("Recipe", recipeSchema);