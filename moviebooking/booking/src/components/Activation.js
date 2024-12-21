import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Activation.css";

const Activation = () => {
    const [emailId, setEmail] = useState('');

    useEffect(() => {
        const getUrlParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const emailId = searchParams.get('email');
            return {emailId};
        };
        const {emailId } = getUrlParams();
        setEmail(emailId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to change the password
            const response = await axios.post('http://localhost:8080/activation', null, {
                params: {
                    email: emailId
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                alert("Your Account is Activated! Login to continue");
            }
            else{
                console.error(response.data);
                alert("Failed to activate your account");
            }
        } catch (error) {
            console.error("Error activating the account:", error);
            alert("Failed to activate your account");
        }
    };

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#ecf4ed', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="activation-button">
                        Click to Activate
                    </button>
                    <div style={{ padding: 20}}>
                    <p>Login to continue. <a href="Login" className="login-link">Log In</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Activation;
