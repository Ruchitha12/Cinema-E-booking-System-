import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/loginSlice';
import { cartActions } from '../redux/cart';
import axios from 'axios';

function OrderPage() {
  const {id,email} = useSelector((state) => state.login);
  const [promo, setPromo] = useState("");
  const onlineFee = 0.02
  const [discount, setDiscount] = useState(100);
  const [cards, setCards] = useState([{
    cardType:"",
    cardNumber:"",
    expirationDate:"",
    id:0
  }])
  const [showCards, setShowCards] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPromoForm, setShowPromoForm] = useState(false); // Define showPromoForm state variable
  const isLoggedIn = useSelector((state) => state.login.email);
  const [selectedCard, setSelectedCard] = useState(null);
  const {
    movie,
    date,
    time,
    adults,
    children,
    senior
  } = useSelector((state) => state.cart);
  const [costs, setCosts] = useState({
    tadults:0, tchildren:0, tsenior:0, sub:0, tax:0, discount:0, total:0
  });
  const [billAddy, setBD] = useState("")
  const [cn, setCN] = useState("")
  const [ct, setCT] = useState("")
  const [ed, setED] = useState("")
  const [add, setAdd] = useState(0);
  const [pos, setPos] = useState(0);//experiment

  useEffect(() => {
    const subtotal = adults * 14.99 + children * 9.99 + senior * 8.99;
    const tax = subtotal * 0.08;
    const totalBeforeDiscount = subtotal + tax;
    const discountAmount = totalBeforeDiscount * ((discount!== 100? discount : 0) *.01);
    const total = totalBeforeDiscount - discountAmount;
    const totalWithOnlineFee = total * (1 + onlineFee);
  
    // console.log("Subtotal:", subtotal);
    // console.log("Tax:", tax);
    // console.log("Total before discount:", totalBeforeDiscount);
    // console.log("Discount amount:", discountAmount);
    // console.log("Discount: " + discount)
    // console.log("Total:", total);
    // console.log("Total with online fee:", totalWithOnlineFee);
  
    setCosts({
      tadults: adults * 14.99,
      tchildren: children * 9.99,
      tsenior: senior * 8.99,
      sub: subtotal,
      tax: tax,
      total: totalWithOnlineFee,
    });
  }, [adults, children, senior, discount]);
  
  
  
  useEffect(() => {
    if (showPaymentForm){
    window.addEventListener("scroll", () => {
      if (window.scrollY < window.screen.height*0.37) {
        setPos(window.scrollY)
      }
    })
  }
  
    if (!showPaymentForm){
      window.removeEventListener('scroll',  () => {
        if (window.scrollY < window.screen.height*0.37) {
          setPos(window.scrollY)
        }
      });
    }
  }, [showPaymentForm])

  useEffect(() => {
    if (isLoggedIn === "") {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetch("http://localhost:8080/getUserID?email="+email)
    .then((response) => response.json())
    .then((data) => dispatch(loginActions.setId(data)))
    .catch(err => console.log(err))
    console.log("user: " + id)
  }, [costs])

  const togglePaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
    setShowCards(false)
  };

  const togglePromoForm = () => {
    setShowPromoForm(!showPromoForm);

    setShowPaymentForm(false);

  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(loginActions.setEmail(""));
    navigate('/');
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to server
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('handle data');
    // Handle form submission here, e.g., send data to server
  };

  const getUsersCards = () =>{
    setShowCards(true);
    console.log(showCards + " " + showPaymentForm)
    setShowPaymentForm(false)
    var tempCard = [{
      cardType:"",
      cardNumber:"",
      expirationDate:""
    }]
    fetch("http://localhost:8080/getCards")
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      data.map((item) => {
          tempCard.push({
            cardType:item.split("\t")[0],
            cardNumber:item.split("\t")[1],
            expirationDate:item.split("\t")[2],
            id: item.split("\t")[3]
          })
      })
      if (cards !== tempCard)
        setCards(tempCard)  
    })
  }

  const applyPromo = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/getPromotion?promotion=" + promo)
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is retrieved properly and contains the discount value
        if (data) {
          setDiscount(data);
          console.log(data)
        } else {
          // Handle error or invalid data response from the server
          console.error("Invalid response from server:", data);
        }
      })
      .catch((err) => console.log(err));
  };
  

  const submitWithNewCard = (e) => {
      e.preventDefault();
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
      getUsersCards();
      })
      .catch((err) => console.log(err))
      
  }
  const orderConfirmed = () => {
    fetch("http://localhost:8080/orderConfirmed", {method:'POST'})
    .then(() => console.log("confirmation sent"))
    .catch((err) => console.log(err))
  }
//userID, promoID, orderTotal, cardID, adults, children, senior
  const payWithExistingCard = (card) => {
    const input = id + ", " + promo+", "+ costs.total.toFixed(2) + ", " + card.id + ", " + adults + ", " + children + ", " + senior + ", " + (movie?movie:"none");
    console.log(input)
    axios.post("http://localhost:8080/addTicket", {input})
    .catch(err => console.log(err));
  }
  return (
      <div className='fullScreen'>
          <div className="manage-promotions">
            <form>
            <label htmlFor="promo">Promo Code</label>
            <input type="text" id="promo" name="promo" placeholder="Enter promo code" onChange={(word) => setPromo(word.target.value)} on/>
            <button onClick={applyPromo}>Apply</button>
            </form>
          </div>
        <div className="orderbox">
          <div className="orderdetails" style={{top:pos + 'px'}}>
            <p><b>Order Details:</b></p>
            <h1><b>{movie}</b></h1>
            <br/>
            <p>Tickets:</p>
            <br>
            </br>
            <p>Date: {date} at {time}</p>
            <br></br>
            <p>Adults x {adults} - ${costs.tadults}</p>
            <br/>
            <p>Children x {children} - ${costs.tchildren}</p>
            <br/>
            <p>Seniors x {senior} - ${costs.tsenior}</p>
            <br/>
            <p>Subtotal - ${costs.sub}</p>
            <br/>
            <p>Tax - ${costs.tax.toFixed(2)}</p>
            <br/>
            <p>Online fees - {onlineFee*100}%</p>
            <br/>
            <p style={{color: "green", fontWeight: "bold"}}>
                Total - ${costs.total.toFixed(2)}
            </p>
            <br/>
            {discount !== 100 && <p>{promo} applied! (-{discount}%)</p>}
          </div>
          <div className="rightbox">
            <div className="paymentmethodsgrid">
              <div className='space'>
              <button className='paymentmethod' onClick={getUsersCards}>Existing Payment Info</button>
              {showCards&& !showPaymentForm &&
                cards.map((card) => 
                {if (card.cardNumber!=="") {
                  const isSelected = selectedCard && selectedCard.id === card.id;                
                  return(
                  <button
                  key={card.id}
                  className={`paymentmethod ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    payWithExistingCard(card);
                    setSelectedCard(card);
                  }}
                >
                  <div className='cards'>
                    <h3 >{card.cardType}</h3>
                    <p>{card.cardNumber}</p>
                    <p><i>{card.expirationDate}</i></p>
                    </div>
                    </button>
                )}})
              }
              </div>
              <div className='space'>
              <button className='paymentmethod' onClick={togglePaymentForm}>New Payment Method</button>
                  {showPaymentForm && <div className='paymentform'>
                    <form id="paymentForm" onSubmit={submitWithNewCard}>
                      <h2>Payment Details</h2>

                      <div className="form-group">
                        <input type="text" id="cardName" name="cardName" placeholder="Name on Card" required/>
                      </div>
                      <div className="form-group">
                        <input type="text" id="cardType" name="cardType" placeholder="Card Type" required onChange={(e) => setCT(e.target.value)}/>
                      </div>

                      <div className="form-group">
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number"
                               pattern="\d{16}" required
                               style={{ width: "100%" }} onChange={(e) => setCN(e.target.value)}/>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <input type="date" id="cardExpiry" name="cardExpiry" placeholder="Expiry Date(MM/YY)" 
                                 pattern="\d{2}/\d{2}" style={{width:100, height:40, borderRadius:10}}
                                 required onChange={(e) => setED(e.target.value)}/>
                        </div>

                        <div className="form-group">
                          <input type="text" id="cardCVC" name="cardCVC" placeholder="CVC" pattern="\d{3}" required style={{ width: "100%" }}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="text" id="billingAddress" name="billingAddress" placeholder="Billing Address" required
                               style={{ width: "100%" }} onChange={(e) => setBD(e.target.value)}/>
                      </div>

                      <div className="form-group">
                        <input type="checkbox" id="saveCard" name="saveCard" onChange={(e) => setAdd(e.target.value)}/>
                        <label htmlFor="saveCard">Save this card for future payments</label>
                      </div>

                      <button type="submit">Submit Payment</button>
                    </form>
                  </div>}
              </div>
          </div>
        </div>
        <div className="confirmcancelbuttons">
          <button
              style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}
              onClick={() => navigate('/seatBooking')}>Previous
          </button>
          <button
              style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}
              onClick={(e) => handleLogout(e)}>Cancel
          </button>
          <button style={{backgroundColor: 'white', width: '120px', height: '40px', borderRadius: '5px', color: 'black'}}><a
              href="ConfirmationPage" onClick={() => orderConfirmed()}>Confirm Order</a></button>
        </div>
      </div>
      </div>
  );
}

export default OrderPage;
