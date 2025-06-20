import React from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

const Navbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');

    const handleNavigation = (path) => {
        if (path === '/profile' || path === `/user/${userId}` || path === `/favorites/${userId}` || path === '/grocery') {
            if (!token) {
                navigate('/login');
            } else {
                navigate(path === '/user/' ? `/user/${userId}` : path);
            }
        } else {
            navigate(path);
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            handleNavigation('/');
        }
    };

    return (
        <div className="nav">
        <div className="top">
            <div className="left">
                <h2>RecipeCart</h2>
            </div>
            <div className="right">
                <h4>Welcome</h4>
                {token ? (
                    <button onClick={handleLogout} className="btn mx-2"><i className="fa-solid fa-right-from-bracket"></i>Log out</button>
                ) : (
                    <button onClick={() => handleNavigation('/login')} className="btn btn-warning mx-2"><i className="fa-solid fa-right-to-bracket"></i>Login</button>
                )}
            </div>
        </div>
        <div className="middle">
            <button onClick={() => handleNavigation('/')} className="btn mx-2"><i className="fa-solid fa-house"></i>Browse</button>
            <button onClick={() => handleNavigation(`/user/${userId}`)} className="btn mx-2"><i className="fa-solid fa-utensils"></i>Your Recipes</button>
            <button onClick={() => handleNavigation(`/favorites/${userId}`)} className="btn mx-2"><i className="fa-regular fa-heart"></i>Favorites</button>
            <button onClick={() => handleNavigation('/grocery')} className="btn mx-2"><i className="fa-solid fa-list"></i>Grocery list</button>
            <button onClick={() => handleNavigation('/about')} className="btn mx-2"><i className="fa-solid fa-comment-dots"></i>About us</button>
            <button onClick={() => handleNavigation('/profile')} className="btn mx-2"><i className="fa-solid fa-user"></i>Profile</button>
        </div>
        <Search />
    </div>
    );
};

export default Navbar;



