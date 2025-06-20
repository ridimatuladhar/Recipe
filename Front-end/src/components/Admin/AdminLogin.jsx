import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleBackToUserSide = () => {
        navigate('/'); 
    };

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/admin/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            toast.error('Server error. Please try again later.');
        }
    };

    return (
        <>
            <ToastContainer />
            <button onClick={handleBackToUserSide} className="btn-back-login">
                Back to User Side
            </button>
            <div className="container my-5">
                <h4 className='text-center'>Welcome to Admin panel</h4>
                <form onSubmit={loginHandler} className='form-container'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required
                        />
                    </div>
                    <div className="btn-login">
                        <button type="submit" className="btn mx-2">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminLogin;
