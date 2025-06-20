import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        profilePicture: '',
        currentPassword: '', 
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('user_id')
    useEffect(() => {
        const token = localStorage.getItem('access_token');

        axios.get(`http://localhost:3000/api/user/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setUser(response.data.user);
                setFormData({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    bio: response.data.user.bio,
                    profilePicture: response.data.user.profilePicture,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching profile:', error);
                setLoading(false);
            });
    }, [userId]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error('New password and confirm password do not match');
        }

        axios.put(`http://localhost:3000/api/user/profile/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                toast.success(response.data.message);
                setUser(response.data.user);
                navigate('/profile');
            })
            .catch((error) => {
                console.log('Error updating profile:', error);
                toast.error('Error updating profile. Please try again.');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <ToastContainer />
            <img src={user.profilePicture || '/default.png'} alt="Profile" width="150" height="150" />
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>

                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="profilePicture">Profile Picture:</label>
                    <input
                        type="text"
                        id="profilePicture"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Change password fields */}
                <div>
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className='btn mx-2'>Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
