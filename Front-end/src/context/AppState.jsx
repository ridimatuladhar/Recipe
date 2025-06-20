import React, { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
import axios from 'axios'

const AppState = (props) => {
  const url = "http://localhost:3000/api"
  const [token, setToken] = useState(localStorage.getItem('access_token') || "");
 
  
  //register
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${url}/auth/register`, {
        name,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.token) {
        setToken(response.data.token);
        
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('user_id', response.data.userId)
        return { success: true, data: response.data };
    }
    return { success: false, message: "Unexpected response format from server" };
  } catch (error) {
    if (error.response && error.response.status === 400) {
        // Handle case where user already exists
        return { success: false, message: "User already exists." };
    }
    return { success: false, message: "An error occurred during registration" };
}
};

  //login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email, password
        
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (response.data && response.data.token) {
        setToken(response.data.token);
            localStorage.setItem('access_token', response.data.token);
            localStorage.setItem('user_id', response.data.userId);
        return { success: true, data: response.data };
    } else {
        return { success: false, message: response.data.message || "Unexpected response format" };
    }
} catch {
    return { success: false, message: "An error occurred during login" };
}
  }

  
  // Add Recipe
  const addRecipe = async (title, desc, image, ingredients, steps, tags, ctime, ptime, servings) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");
      const response = await axios.post(`${url}/recipes/${userId}/add`, {
        title,
        desc,
        image,
        ingredients,
        steps,
        tags,
        ctime,
        ptime,
        servings,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        withCredentials: true
      });

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "An error occurred while adding the recipe" };
    }
  };

  const fetchRecipe = async (recipe_id) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/recipes/recipe/${recipe_id}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        //setRecipe(response.data); 
        return response
    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
  }

 
  const fetchReviewsByRecipeId = async (recipeId) => {
    try {
      const response = await axios.get(`${url}/reviews/${recipeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
      if (response.data.length === 0) {
        return [];       }
      
      return response.data;
      
    } catch (error) {
      return []; 
    }
  };
  

  return (
    <AppContext.Provider value={{ 
      token,
      login,
      register,
      addRecipe,
      fetchRecipe,
      fetchReviewsByRecipeId 
    }}>
      {props.children}
    </AppContext.Provider>

  )
}

export default AppState
