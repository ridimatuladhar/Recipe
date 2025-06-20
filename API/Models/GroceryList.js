import mongoose from "mongoose";

const groceryListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipeName: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
});

export const GroceryList = mongoose.model("GroceryList", groceryListSchema);
