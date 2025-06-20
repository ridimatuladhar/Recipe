import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Grocery = () => {
    const [groceryList, setGroceryList] = useState([]);
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroceryList = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/grocery/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    }
                );
                if (response.status === 200) {
                    setGroceryList(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch grocery list:', error);
                toast.error('Failed to fetch grocery list.');
            }
        };

        fetchGroceryList();
    }, [userId]);

    const handleRemoveIngredient = async (groceryListId, ingredient) => {
        try {
            const response = await axios.patch(
                `http://localhost:3000/api/grocery/${userId}/${groceryListId}/remove-ingredient`,
                { ingredient },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );

            if (response.status === 200) {
                const updatedIngredients = response.data?.ingredients;

                if (Array.isArray(updatedIngredients)) {
                    if (updatedIngredients.length === 0) {
                        toast.success('Recipe removed from grocery list.');
                    } else {
                        setGroceryList(prevList =>
                            prevList.map(item =>
                                item._id === groceryListId
                                    ? { ...item, ingredients: updatedIngredients }
                                    : item
                            )
                        );
                        toast.success('Ingredient removed successfully.');
                    }
                } else {
                    window.location.reload();
                }
            }
        } catch (error) {
        }
    };

    return (
        <div className="grocery-gallery-container">
            <ToastContainer />
            {groceryList.length > 0 ? (
                <div className="gallery">
                    {groceryList.map((item) => (
                        <div className="gallery-item" key={item._id}>
                            <h3 className="recipe-name">{item.recipeName}</h3>
                            <ul className="ingredient-list">
                                {item.ingredients && item.ingredients.length > 0 ? (
                                    item.ingredients.map((ingredient, idx) => (
                                        <li key={idx} className="ingredient-item">
                                            {ingredient}
                                            <button
                                                className="btn mx-2"
                                                onClick={() => handleRemoveIngredient(item._id, ingredient)}
                                            >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p>No ingredients available.</p>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No items in your grocery list.</p>
            )}
        </div>
    );
};

export default Grocery;
