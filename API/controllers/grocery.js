import { GroceryList } from "../Models/GroceryList.js";

// Add ingredients to grocery list
export const addToGroceryList = async (req, res) => {
    try {
        const { recipeName, ingredients } = req.body;
        const { userId } = req.params;  

        const groceryList = new GroceryList({
            user: userId,
            recipeName,
            ingredients
        });

        await groceryList.save();
        res.status(201).json(groceryList);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add to grocery list', error });
    }
};

// Get user's grocery list
export const getGroceryList = async (req, res) => {
    try {
        const { userId } = req.params;  
        const groceryList = await GroceryList.find({ user: userId });

        res.status(200).json(groceryList);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch grocery list', error });
    }
};

// Remove an item from grocery list
export const removeFromGroceryList = async (req, res) => {
    try {
        const { groceryListId, userId } = req.params; 
        await GroceryList.findOneAndDelete({ _id: groceryListId, user: userId });
        res.status(200).json({ message: 'Item removed from grocery list' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item', error });
    }
};

// Remove a specific ingredient from a grocery list
export const removeIngredientFromGroceryList = async (req, res) => {
    try {
        const { userId, groceryListId } = req.params;
        const { ingredient } = req.body;

        const groceryList = await GroceryList.findOne({ _id: groceryListId, user: userId });

        // Remove the ingredient
        groceryList.ingredients = groceryList.ingredients.filter(ing => ing !== ingredient);

        // If no ingredients remain, delete the grocery list
        if (groceryList.ingredients.length === 0) {
            await GroceryList.findByIdAndDelete(groceryListId);
            return res.status(200).json({ message: "Recipe and ingredients removed" });
        }

        await groceryList.save();
        res.status(200).json(groceryList);
    } catch (error) {
        res.status(500).json({ message: "Failed to remove ingredient", error });
    }
};

// Update grocery list with new ingredients
export const updateGroceryItem = async (req, res) => {
    try {
        const { groceryListId, userId } = req.params;
        const { ingredients } = req.body;

        // Find the grocery list by user and groceryListId
        const groceryList = await GroceryList.findOne({ _id: groceryListId, user: userId });

        if (!groceryList) {
            return res.status(404).json({ message: 'Grocery list not found' });
        }

        // Combine the existing ingredients with new ingredients, and ensure uniqueness
        const updatedIngredients = [...new Set([...groceryList.ingredients, ...ingredients])];

        groceryList.ingredients = updatedIngredients;

        await groceryList.save();

        res.status(200).json({ message: 'Grocery list updated successfully', groceryList });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update grocery list', error });
    }
};