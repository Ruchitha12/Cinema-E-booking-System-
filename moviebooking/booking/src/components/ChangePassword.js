import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Function to parse the query parameters from the URL
        const getUrlParams = () => {
            const searchParams = new URLSearchParams(window.location.search);
            const token = searchParams.get('token');
            const email = searchParams.get('email');
            return { token, email };
        };

        // Extract token and email from the URL query parameters
        const { token, email } = getUrlParams();
        setToken(token);
        setEmail(email);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Make an API call to change the password
            const response = await axios.post('http://localhost:8080/resetPassword', null, {
                params: {
                    token: token,
                    email: email,
                    password: newPassword
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                alert("Your password has been changed successfully!");
            }
            else{
                console.error(response.data);
                alert("Failed to change password. Please try again.");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change password. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body" style={{ backgroundColor: '#AEC3B0' }}>
                            <h5 className="card-title text-center">Change Password</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmNewPassword"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-4">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChangePassword;