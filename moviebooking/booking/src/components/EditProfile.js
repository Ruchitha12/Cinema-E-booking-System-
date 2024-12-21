import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditProfile.css';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';


function EditProfile() {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        paymentMethod: 'credit',
        paymentInfo: '',
        promotion: 0,
        address: '',
        phoneNumber: '',
        expirationDate:""
    });
    const {id} = useSelector((state) => state.login)
    
    const [openEdit, setOE] = useState(false)
    const [showPaymentFields, setShowPaymentFields] = useState(false);
    const [showAddPaymentFields, setAddShowPaymentFields] = useState(false);
    const [cards, setCards] = useState([]);
    const [addCardCount, setAddCardCount] = useState(0);
    const [billAddy, setBD] = useState("")
    const [cn, setCN] = useState("")
    const [ct, setCT] = useState("")
    const [currentCard, setCC] = useState("")
    const [prevCard, setPC] = useState("")
    const [ed, setED] = useState("")
    const [data, setData] = useState("");
    const [lastFourDigits, setLastFourDigits] = useState('');
    //password
    const [wrong, setWrong] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:8080/getInfo")
            .then(response => {
                console.log("Response: ", response.data)
                const data = response.data.split("\t");
                console.log(data)
                setProfile(profile => ({firstName: data[0],
                lastName: data[1],
                email: data[2],
                password: data[3],
                paymentMethod: data[4],
                paymentInfo: data[5],
                promotion: data[6],
                expirationDate:data[7],
                address: data[8],
            phoneNumber: data[9]}));
            })
            .catch(error => console.error('Error fetching profile data:', error));
            var tempCard = [{
                cardType:"",
                cardNumber:"",
                expirationDate:"",
                id:""
            }]
            const getCards = async() => {
                await fetch("http://localhost:8080/getCards")
                .then((response) => response.json())
                .then(data => {
                console.log("data",data);
                data.map((item) => {
                    tempCard.push({
                        cardType:item.split("\t")[0],
                        cardNumber:item.split("\t")[1],
                        expirationDate:item.split("\t")[2],
                        id: item.split("\t")[3],
                        billingAddress: item.split("\t")[4]
                    })
                })
                if (cards !== tempCard)
                    setCards(tempCard)  
                })
            }
            getCards();
    }, []);

    useEffect(() => {
        if (profile.paymentInfo)
        setLastFourDigits(profile.paymentInfo.slice(-4));
    }, [profile.paymentInfo]);

    const submitWithNewCard = (e) => {
        e.preventDefault();
        console.log({
            expirationDate: ed,
            cardType: ct,
            cardNumber: cn,
            billingAddress: billAddy,
            userID: id
          })
        const options = {
          method: 'POST', // HTTP method
          headers: {
              'Content-Type': 'application/json' // Specify content type as JSON
          },
          body: JSON.stringify({
            expirationDate: ed,
            cardType: ct,
            cardNumber: cn,
            billingAddress: billAddy,
            userID: id
          }) // Convert data to JSON string
      };
        fetch("http://localhost:8080/addCard", options)
        .then(() => {
          console.log("submitted")
        })
        .catch((err) => console.log(err))
        
    }
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        console.log(name + " " + value)
        if (name === "billingAddress") {
            
            setBD(value)
        }
        else if (name === "expirationDate") {
            setED(value)
        }
        else if (name === "cardNumber") {
            setCN(value)
        }
        else if (name === "paymentMethod") {
            setCT(value)
        }
        // if (name === "promostatus") {
        //     var val = event.target.value === "yes" ? 1 : 0;
        //     setProfile(prevState => ({
        //         ...prevState,
        //         "promotion": val
        //     }));
        // } else if (name === "npassword" && value !== profile.password ) {
        //     if (document.getElementById("password").value === data.split(", ")[3]) {
        //         setProfile({ ...profile, password: value });
        //     }
        //     else {
        //         setWrong(true)
        //     }
        // }
        // else {
        //     setProfile({...profile, [name]:value})
        // }
        //console.log(profile.expirateDate);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        //for comparison if data changed
        var profileString = profile.firstName +", " +
        profile.lastName +", " +
        profile.email +", " +
        profile.password +", " +
        profile.paymentMethod +", " +
        profile.paymentInfo +", " +
        profile.address +", "+
        profile.phoneNumber;
        if (profileString !== data) {
            updateInfo();
        }
        // Handle form submission, send profile data to server
     }
     const updateInfo = async() => {
        const options = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(profile) // Convert data to JSON string
        };
        console.log(profile)
        await fetch("http://localhost:8080/updateInfo",options)
        .catch(err => console.log(err));
     }
    // const togglePaymentFields = () => {
    //     setShowPaymentFields(!showPaymentFields);
    // };
    const togglePaymentFields = () => {
        // if (editCardCount < 3) { // Check if "Edit Card" button has been clicked less than 3 times
            setShowPaymentFields(!showPaymentFields);
            // setEditCardCount(count => count + 1); // Increment the counter
        // }
    };


    const toggleAddPaymentFields = () => {
        if (addCardCount === 0 || addCardCount < 6) {
            setAddShowPaymentFields(!showAddPaymentFields);
            setAddCardCount(count => count + 1);
            renderAddPaymentFields();
        } else {
            setAddShowPaymentFields(false);
            alert("Already three cards added...");
            // setAddCardCount(count => count + 1);
        }
    };
    const changeCardInfo = (card) => {
        const options = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: JSON.stringify(card) // Convert data to JSON string
        };
        fetch("http://localhost:8080/updateCard",
            options
        )
        .then(() => {console.log("success");
        //window.location.reload();
    })
        .catch((err) => console.log(err))
    }
    const renderAddPaymentFields = () => {
        const fields = [];
        // for (let i = 0; i < 3; i++) {
            fields.push(
                <React.Fragment >
                    {showAddPaymentFields && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="paymentMethod" className="form-label">Card Type</label>
                                <select className="form-select" id="paymentMethod" name="paymentMethod"
                                        placeholder={profile.paymentMethod} onChange={handleInputChange}>
                                    <option value="Visa">Visa</option>
                                    <option value="MasterCard">MasterCard</option>
                                    <option value="AmericanExpress">American Express</option>
                                    <option value="Discover">Discover</option>
                                </select>
                            </div>
                            <div className="form-group">
                        <input type="text" id="cardName" name="cardName" placeholder="Name on Card" required />
                      </div>


                      <div className="form-group">
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number"
                               pattern="\d{16}" required
                               style={{ width: "100%" }} onChange={(word) => setCN(word.target.value)}/>
                      </div>
                      <div className="form-group">
                        <input type="text" id="billingAddress" name="billingAddress" placeholder="Billing Address"
                               required
                               style={{ width: "100%" }} onChange={(word) => setBD(word.target.value)}/>
                      </div>
                            <div className="mb-3">
                                <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                                <input type="date" className="form-control" id="expirationDate"
                                       name="expirationDate" minLength="16" maxLength="16"
                                       onChange={handleInputChange} />
                            </div>
                            <button type="button" className="btn btn-primary mb-3" onClick={submitWithNewCard}>
                            Add Card
                        </button>
                           
                        </>
                    )}
                </React.Fragment>
            );
        // }
        return fields;
    }

    return (
        <div className='fullScreen'>
        <h3 className='edit-profile-header'>Edit Profile</h3>
        <div className="container">
            <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        {wrong && <p style={{color: 'red'}}><i>Wrong Password</i></p>}
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName"
                                 onChange={handleInputChange} placeholder={profile.firstName}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName"
                                    onChange={handleInputChange} placeholder={profile.lastName}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" 
                                   placeholder={profile.email}readOnly/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password"
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="npassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="npassword" name="npassword"
                                   onChange={handleInputChange}/>
                        </div>
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="paymentMethod" className="form-label">Card Type</label>*/}
                        {/*    <select className="form-select" id="paymentMethod" name="paymentMethod" placeholder={profile.paymentMethod} onChange={handleInputChange}>*/}
                        {/*    <option value="Visa">Visa</option>*/}
                        {/*    <option value="MasterCard">MasterCard</option>*/}
                        {/*    <option value="AmericanExpress">American Express</option>*/}
                        {/*    <option value="Discover">Discover</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="paymentInfo" className="form-label">Payment Information</label>*/}
                        {/*    <input type="text" className="form-control" id="paymentInfo" name="paymentInfo" onChange={handleInputChange} placeholder={profile.paymentInfo}/>*/}
                        {/*</div>*/}
                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="address" className="form-label">Billing Address</label>*/}
                        {/*    <input type="text" className="form-control" id="address" name="address" onChange={handleInputChange} placeholder={profile.address}  />*/}
                        {/*</div>*/}
                        {/*<div class="mb-3">*/}
                        {/*    <label for="expirationDate" class="form-label">Expiration Date </label>*/}
                        {/*    <input type="date" class="form-control" id="expirationDate" name="expirationDate" minlength="16" maxlength="16" onChange={handleInputChange} value={profile.expirationDate}/>*/}
                        {/*</div>*/}
                        
                        {
                            cards.map((card) => 
                            {if (card.cardNumber!=="") return(
                                <div className='btn btn-primary mb-3'>
                                    <div> <h3 >{card.cardType}</h3> 
                                    <p>XXXX - XXXX - XXXX - {lastFourDigits}</p> 
                                    <p><i>{card.expirationDate}</i></p>
                                    <p><i>{card.billingAddress}</i></p>
                                    </div>
                                    <button type="button" className="btn btn-primary mb-3" onClick={() => changeCardInfo(card)}>
                                        Delete Card
                                    </button>
                                </div>
                            )})
                        }
                        {showPaymentFields && (
                            <>
                                <div className="mb-3">
                                    <label htmlFor="paymentMethod" className="form-label">Card Type</label>
                                    <select className="form-select" id="paymentMethod" name="paymentMethod"
                                            placeholder={profile.paymentMethod} onChange={handleInputChange}>
                                        <option value="Visa">Visa</option>
                                        <option value="MasterCard">MasterCard</option>
                                        <option value="AmericanExpress">American Express</option>
                                        <option value="Discover">Discover</option>
                                    </select>
                                </div>
                                <div className="form-group">
                        {/*<label htmlFor="cardName">Name on Card</label>*/}
                        <input type="text" id="cardName" name="cardName" placeholder="Name on Card" required/>
                      </div>


                      <div className="form-group">
                        {/*<label htmlFor="cardNumber">Card Number</label>*/}
                        <input type="password" id="cardNumber" name="cardNumber" placeholder="Card Number"
                               pattern="\d{16}" required
                               style={{ width: "100%" }}/>
                      </div>
                                <div className="mb-3">
                                    <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                                    <input type="date" className="form-control" id="expirationDate"
                                           name="expirationDate" minLength="16" maxLength="16"
                                           onChange={handleInputChange} value={profile.expirationDate}/>
                                </div>
                            </>
                        )}
                        {/*<button type="button" className="btn btn-primary mb-3" onClick={toggleAddPaymentFields}>*/}
                        {/*    Add Card*/}
                        {/*</button>*/}
                        {/*{showAddPaymentFields && (*/}
                        {/*    <>*/}
                        {/*        <div className="mb-3">*/}
                        {/*            <label htmlFor="paymentMethod" className="form-label">Card Type</label>*/}
                        {/*            <select className="form-select" id="paymentMethod" name="paymentMethod"*/}
                        {/*                    placeholder={profile.paymentMethod} onChange={handleInputChange}>*/}
                        {/*                <option value="Visa">Visa</option>*/}
                        {/*                <option value="MasterCard">MasterCard</option>*/}
                        {/*                <option value="AmericanExpress">American Express</option>*/}
                        {/*                <option value="Discover">Discover</option>*/}
                        {/*            </select>*/}
                        {/*        </div>*/}
                        {/*        <div className="mb-3">*/}
                        {/*            <label htmlFor="paymentInfo" className="form-label">Payment Information</label>*/}
                        {/*            <input type="text" className="form-control" id="paymentInfo" name="paymentInfo"*/}
                        {/*                   onChange={handleInputChange} placeholder={profile.paymentInfo}/>*/}
                        {/*        </div>*/}
                        {/*        <div className="mb-3">*/}
                        {/*            <label htmlFor="address" className="form-label">Billing Address</label>*/}
                        {/*            <input type="text" className="form-control" id="address" name="address"*/}
                        {/*                   onChange={handleInputChange} placeholder={profile.address}/>*/}
                        {/*        </div>*/}
                        {/*        <div className="mb-3">*/}
                        {/*            <label htmlFor="expirationDate" className="form-label">Expiration Date</label>*/}
                        {/*            <input type="date" className="form-control" id="expirationDate"*/}
                        {/*                   name="expirationDate" minLength="16" maxLength="16"*/}
                        {/*                   onChange={handleInputChange}/>*/}
                        {/*        </div>*/}
                        {/*    </>*/}
                        {/*)}*/}


                        <button type="button" className="btn btn-primary mb-3" onClick={toggleAddPaymentFields}>
                            Add New Card Form <span>&#9660;</span>
                        </button>


                        {renderAddPaymentFields()}
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="phoneNumber" name="phoneNumber"
                                    onChange={handleInputChange}
                                   placeholder={profile.phoneNumber}/>
                        </div>
                        <div class="mb-3">
                            <label for="promostatus" class="form-label">Sign Up for Promotions?</label>
                            <select class="form-select" id="promostatus" name="promostatus"
                                    onChange={handleInputChange}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>
            </div>
    );
}


export default EditProfile;
