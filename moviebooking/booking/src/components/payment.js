import React from 'react';
import './payment.css'; // Import the CSS file

function PaymentPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('handle data');
    // Handle form submission here, e.g., send data to server
  };

  return (
    <div className="payment-container">
      <form id="paymentForm" onSubmit={handleSubmit}>
        <h2>Payment Details</h2>

        <div className="form-group">
          <label htmlFor="cardName">Name on Card</label>
          <input type="text" id="cardName" name="cardName" placeholder="First Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" pattern="\d{16}" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cardExpiry">Expiry Date</label>
            <input type="text" id="cardExpiry" name="cardExpiry" placeholder="MM/YY" pattern="\d{2}/\d{2}" required />
          </div>

          <div className="form-group">
            <label htmlFor="cardCVC">CVC</label>
            <input type="text" id="cardCVC" name="cardCVC" placeholder="CVC" pattern="\d{3}" required />
          </div>
        </div>

        <div className="form-group">
          <input type="checkbox" id="saveCard" name="saveCard" />
          <label htmlFor="saveCard">Save this card for future payments</label>
        </div>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default PaymentPage;
