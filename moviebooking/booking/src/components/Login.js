import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const isAdmin = useSelector((state) => state.login.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const encodedPassword = btoa(password);;
  const handleSubmit = async (event) => { // Use async to handle asynchronous logic
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', null, {
        params: {
          email: email,
          password: encodedPassword
        }
      });
      if (response.status === 200) {
        console.log(response.data)
        if (response.data === "Login successful as admin") {
          const isAdmin = response.data === "Login successful as admin";
          // Redirect to homepage upon successful login
          // localStorage.setItem('isAdmin', isAdmin); 
          console.log("Admin")
          dispatch(loginActions.setAdmin(true));
          dispatch(loginActions.setEmail(email));
          navigate('/');
          
        } else if (response.data === "Login successful as customer") {
          // Redirect to homepage upon successful login
          dispatch(loginActions.setAdmin(false));
          dispatch(loginActions.setEmail(email));
          navigate('/');

        } else {
          console.error('Login failed:', response.data);
          alert(response.data);
        }
      } else {
        // Handle other HTTP status codes
        console.error('Login failed:', response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        alert(error.response.data);
      } else if (error.request) {
        alert("No response received. Check your network connection.");
      } else {
        alert("Error setting up the request.");
      }
    }
  };

  return (
    <div>
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Login Page</title>
            {/* Include Bootstrap CSS */}
            <link rel="stylesheet" href="Login.css"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,700;1,300;1,900&family=Lilita+One&display=swap" rel="stylesheet" />
        </head>
        <div>
        {/* Login Card */}
        <div className="login-container" style={{ maxWidth: '700px', margin: '0 auto', marginTop: '50px' }}>
            <div className="card">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="custom-login-button btn btn-primary btn-block">Login</button>
                </form>
                <p className="mt-3">Don't have an account? <a href="#" onClick={() => navigate('/signup')}>Sign Up</a></p>
                <p className="mt-3">Forgot password? <a href="#" onClick={() => navigate('/forgetPassword')}>Reset Password</a></p>
            </div>
            </div>
        </div>
      </div>

      {/* Include Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default Login;