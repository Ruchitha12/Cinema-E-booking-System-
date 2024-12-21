import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { email } = useSelector((state) => state.login);
  const [cardNumber, setCardNumber] = useState()

  useEffect(() => {
    // Fetch the user's order history from the backend
    axios
      .get(`http://localhost:8080/getUserOrders`)
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
        //setCardNumber(response.data.cardNumber.substring(response.data.cardNumber.length-5, response.data.cardNumber.length))
      })
      .catch((error) => {
        console.error('Error fetching order history:', error);
      });
  }, [email]);

  const fetchMovieTitle = async (showID) => {
    try {
      const response = await axios.get(`http://localhost:8080/getMovieTitle?showID=${showID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie title:', error);
      return '';
    }
  };

  return (
    <div className="order-history-container">
      <div className="title">
        <h2>Order History</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Booking Number</th>
            <th>Movie</th>
            <th>Promotion</th>
            <th>Card Number</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Senior</th>
            <th>Order Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.bookingID}>
              <td>{order.bookingID}</td>
              <td>
                {order.movie}
              </td>
              <td>{order.promotion}</td>
              <td>{order.cardNumber}</td>
              <td>{order.adults}</td>
              <td>{order.children}</td>
              <td>{order.senior}</td>
              <td>{order.orderTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MovieTitleLoader = ({ showID, fetchMovieTitle }) => {
  const [movieTitle, setMovieTitle] = useState('Loading...');

  useEffect(() => {
    const fetchTitle = async () => {
      const title = await fetchMovieTitle(showID);
      setMovieTitle(title);
    };
    fetchTitle();
  }, [showID, fetchMovieTitle]);

  return <>{movieTitle}</>;
};

export default OrderHistory;
