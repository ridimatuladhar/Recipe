import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav'; // Assuming AdminNav is in the same folder

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(null);
    const [recipeCount, setRecipeCount] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the counts from the server
        const fetchCounts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setUserCount(data.userCount);
                setRecipeCount(data.recipeCount);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCounts();
    }, []);

    const handleBackToUserSide = () => {
        navigate('/'); // Navigate back to the user side
    };

    return (
        <div className="admin-dashboard">
            <AdminNav />
            <div className="dashboard-content">
                <button onClick={handleBackToUserSide} className="btn-back">
                    Back to User Side
                </button>
                <h3>Admin Dashboard</h3>
                {error && <p className="error">{error}</p>}
                <div className="counts">
                    <div className="count-box">
                        <p><strong>Number of Users:</strong></p>
                        <p className="count-value">{userCount !== null ? userCount : 'Loading...'}</p>
                    </div>
                    <div className="count-box">
                        <p><strong>Number of Recipes:</strong></p>
                        <p className="count-value">{recipeCount !== null ? recipeCount : 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
