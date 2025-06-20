import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        navigate('/register');
    };

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await login(email, password);

            if (result && result.success && result.data && result.data.token) {
                // Save the token in localStorage
                localStorage.setItem('access_token', result.data.token);
                toast.success("Login successful");

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container my-5">
                <h4 className='text-center'>Welcome back!</h4>
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
                        <p>Don’t have an account? <button type="button" onClick={handleRegister} className="btn btn-link p-0">Sign up</button></p>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;

