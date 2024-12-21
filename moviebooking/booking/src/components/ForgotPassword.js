import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './ForgotPassword.css';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/forgotPassword', null, {
                params: {
                    email: email
                }
            });
            if (response.status === 200) {
                console.log(response.data); // Handle the response as needed
                navigate('/EmailConfirmation');
               
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message, etc.
        }
    };


    return (
        <>
            {/* Forgot Password Card */}
            <div className="container login-container">
                <div className="card">
                    <div className="card-body" style={{ backgroundColor: 'white' }}>
                        <h5 className="card-title">Forgot Password</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="custom-login-button btn btn-primary btn-block">
                                Send Recovery Email
                            </button>
                        </form>
                        <p className="mt-3">Don't have an account? <a href="SignUp" id="signupLink">Sign Up</a></p>
                        <p className="mt-3">Go back to login page: <a href="Login" id="login">Login</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}


export default ForgotPassword;
