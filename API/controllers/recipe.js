import {Recipe} from '../Models/Recipe.js'
import { User } from '../Models/User.js';

export const createRecipe = async (req, res) => {
    const { title, desc, image, ingredients, steps, tags, ctime, ptime, servings } = req.body;
    try {
        const recipe = await Recipe.create({
            title,
            desc,
            image,
            ingredients,
            steps,
            tags,
            ctime,
            ptime,
            servings,
            user: req.user._id,
        });
        res.status(201).json({ message: 'Recipe created successfully', recipe });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getRecipeByUserId = async (req, res) => {
    const { userId } = req.params; 
    try {
        const recipes = await Recipe.find({ user: userId }); 
        
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getRecipeById = async (req, res) => {
    const { id } = req.params; 
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' }); 
        }
        res.status(200).json(recipe); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { title, desc, image, ingredients, steps, tags, ctime, ptime, servings } = req.body;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (recipe.user.toString() !== req.user._id.toString() ) {
            return res.status(403).json({ message: 'Access denied' });
        }
        recipe.title = title || recipe.title;
        recipe.desc = desc || recipe.desc;
        recipe.image = image || recipe.image;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.steps = steps || recipe.steps;
        recipe.tags = tags || recipe.tags;
        recipe.ctime = ctime || recipe.ctime;
        recipe.ptime = ptime || recipe.ptime;
        recipe.servings = servings || recipe.servings;

        const updatedRecipe = await recipe.save();
        res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (recipe.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// export const searchRecipes = async (req, res) => {
//     const { ingredients, tags } = req.query;
//     try {
//         const query = {};
//         if (ingredients) {
//             query.ingredients = { $in: ingredients.split(',') };
//         }
//         if (tags) {
//             query.tags = { $in: tags.split(',') };
//         }
//         const recipes = await Recipe.find(query);
//         res.status(200).json(recipes);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// Search for recipes by ingredients and tags
export const searchRecipes = async (req, res) => {
    try {
        let { ingredients, tags } = req.query;

        // Split comma-separated strings into arrays
        const ingredientsArray = ingredients ? ingredients.split(',').map(item => item.trim()) : [];
        const tagsArray = tags ? tags.split(',').map(item => item.trim()) : [];

        // Create search conditions
        let searchConditions = {};

        if (ingredientsArray.length > 0) {
            searchConditions.ingredients = { $all: ingredientsArray };
        }

        if (tagsArray.length > 0) {
            searchConditions.tags = { $all: tagsArray };
        }
        const recipes = await Recipe.find(searchConditions);

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getFavorites = async (req, res) => {
    const { userId } = req.params; // Extract userId from request parameters

    try {
        const user = await User.findById(userId).populate('favorites'); // Use findById and populate favorites

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};



export const addToFavorites = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        const user = await User.findById(req.user._id);
        if (!user.favorites.includes(id)) {
            user.favorites.push(id);
            await user.save();
        }
        res.status(200).json({ message: 'Recipe added to favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const removeFromFavorites = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(req.user._id);
        if (!user.favorites.includes(id)) {
            return res.status(404).json({ message: 'Recipe not found in favorites' });
        }
        user.favorites.pull(id);
        await user.save();
        res.status(200).json({ message: 'Recipe removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

