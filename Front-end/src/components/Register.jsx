import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const { register } = useContext(AppContext)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("");
    const [passwordLengthError, setPasswordLengthError] = useState("");

    const handleLogin = () => {
        navigate('/login');
    };


    const registerHandler = async (e) => {
        e.preventDefault()

        if (password.length < 8) {
            setPasswordLengthError("Password must be at least 8 characters long.");
            return;
        } else {
            setPasswordLengthError("");
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match!")
            return
        } else {
            setPasswordError("")
        }

        const result = await register(name, email, password);

        if (result.success) {
            toast.success(result.data.message);

            if (result.data.message !== 'User already exists.') {
                setTimeout(() => {
                    navigate('/login')
                }, 1500);
            }
        } else {
            toast.error(result.message);
        }
    }


    return (
        <>
            <ToastContainer />
            <div className="container my-5">
                <h4 className='text-center'>"Cook, Share, and Savor: Delicious Recipes for Every Taste!"</h4>
                <form className='form-container' onSubmit={registerHandler}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Username</label>
                        <input value={name} onChange={(e) => setname(e.target.value)} type="text" className="form-control" id="exampleInputName" required></input>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input value={email} onChange={(e) => setemail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" required></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                        <input value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword2" required></input>
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                    </div>

                    <div className="btn-login">
                        <button type="submit" className="btn mx-2">Sign up</button>
                        <p>Already have an account? <button type="button" className="btn btn-link p-0" onClick={handleLogin}>Login</button></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
