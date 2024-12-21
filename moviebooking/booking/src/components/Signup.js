import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"


function SignupPage() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        cardType:'',
        paymentInfo: '',
        expirationDate: '',
        promotion: 1 // Default value for promotions
    });
    const [showPaymentFields, setShowPaymentFields] = useState(false);
    const handlefn = (event) => {
        setFormData({...formData, firstName: event.target.value})
        // console.log(event.target.value)
    }
    const handleln = (event) => {
        setFormData({...formData, lastName: event.target.value})
        // console.log(event.target.value)
    }
    const handleem = (event) => {
        setFormData({...formData, email: event.target.value})
        // console.log(event.target.value)
    }
    const handlepw = (event) => {
        setFormData({...formData, password: event.target.value})
        // console.log(event.target.value)
    }
    const handlecp = (event) => {
        setFormData({...formData, confirmPassword: event.target.value})
        // console.log(event.target.value)
    }
    const handleph = (event) => {
        setFormData({...formData, phoneNumber: event.target.value})
        // console.log(event.target.value)
    }
    const handleadd = (event) => {
        setFormData({...formData, address: event.target.value})
        // console.log(event.target.value)
    }
    const handlect = (event) => {
        setFormData({...formData, cardType: event.target.value})
        // console.log(event.target.value)
    }
    const handlepc = (event) => {
        setFormData({...formData, paymentInfo: event.target.value})
        // console.log(event.target.value)
    }
    const handleed = (event) => {
        setFormData({...formData, expirationDate: event.target.value})
        // console.log(
    }
    const handlest = (event) => {
        var val = event.target.value === "yes" ? 1 : 0;
        setFormData({...formData, promotion: val})
        // console.log(event.target.value)
    }
    useEffect(() => {
        console.log(formData)
    },[])
    const validatePassword = () => {
        const { password, confirmPassword } = formData;
        console.log("password" + password)
        console.log("confirm    "  + confirmPassword)
        if (password !== confirmPassword) {
            document.getElementById("confirm").setCustomValidity("The passwords do not match.");
        } else {
            document.getElementById("confirm").setCustomValidity("");
            postInfo();
        }
    }

    const postInfo = async () => {
        // const { firstName, lastName, email, password, paymentCard } = formData;
        const options = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(formData) // Convert data to JSON string
        };
        await fetch("http://localhost:8080/postInfo",options)
        .then((response) => console.log(response))
        .catch(err=> console.log(err))

    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        validatePassword();
        navigate('/RegConfirmation'); // Use navigate function to redirect to '/RegConfirmation'
    }

    const togglePaymentFields = () => {
        setShowPaymentFields(!showPaymentFields);
    };

    return (
        <div>
            <div className="signup-container">
                <div className="card">
                    <div className="card-body" style={{ backgroundColor: 'white' }}>
                        <h3 className="card-title">Sign Up</h3>
                        <form id="signupForm" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="firstname" name="firstName" onChange={handlefn}placeholder='First Name' required />
                            </div>
                            <div class="mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastname" name="lastname" onChange={handleln}placeholder='Last Name'required/>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="email" name="email" onChange={handleem} placeholder='Email Address'required/>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={handlepw} placeholder='Password'/>
                    <div class="bullets">
                        <ul>
                            <li>At least 8 characters</li>
                            <li>At least 1 uppercase letter</li>
                            <li>At least 1 lowercase letter</li>
                            <li>At least 1 number</li>
                        </ul>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="confirm" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={handlecp}placeholder='Password'/>
                </div>
                <div class="mb-3">
                    <label for="phoneNumber" class="form-label">Phone Number</label>
                    <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" onChange={handleph}placeholder='Phone Number'/>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address (optional)</label>
                    <input type="text" class="form-control" id="address" name="address" onChange={handleadd} placeholder='123 Movie St.'/>
                </div>
                <button type="button" className="btn btn-primary mb-3" onClick={togglePaymentFields}>
                    Add Card
                </button>
                {showPaymentFields && (
                    <>
                <div class="mb-3">
                    <div class="card-type">
                    <label for="cardType" class="form-label">Card Type (optional)</label>
                    </div>
                    <select class="form-select" id="cardType" name="cardType" onChange={handlect}>
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="AmericanExpress">American Express</option>
                        <option value="Discover">Discover</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="paymentcard" class="form-label">Payment Card (optional)</label>
                    <input type="text" class="form-control" id="paymentcard" name="paymentcard" onChange={handlepc}/>
                </div>
                <div class="mb-3">
                    <label for="expiration_date" class="form-label">Expiration Date (optional)</label>
                    <input type="date" class="form-control" id="expiration_date" name="paymentcard" minlength="16" maxlength="16" onChange={handleed}/>
                </div>
                    </>
                )}
                <div class="mb-3">
                    <div class="promo-label">
                    <label for="promostatus" class="form-label">Sign Up for Promotions?</label>
                    </div>
                    <select class="form-select" id="promostatus" name="promostatus" onChange={handlest}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <button type="submit" className="custom-signup-button btn btn-primary btn-block">Sign Up</button>
                        </form>
                        <p className="mt-3">Already have an account? <a href="Login">Log In</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
