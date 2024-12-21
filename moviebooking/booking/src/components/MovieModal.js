import React from 'react';
import { Link } from 'react-router-dom';
import './MovieModal.css'; 
import { useDispatch } from 'react-redux';
import { cActions } from '../redux/currentMovie';

const MovieModal = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoID = extractVideoID(movie.trailer);
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  const formatDates = (dates) => {
    if (!Array.isArray(dates)) return dates; // Return the date string if it's not an array
    return dates.map(date => {
      const trimmedDate = date.split('(')[0].trim(); // Remove the "(Screen ID: X)" part and trim any extra spaces
      return trimmedDate;
    }).join(', '); // Join the formatted dates with a comma
  };
  
  const handleButton = () => {
    console.log(movie.title)
    dispatch(cActions.setID(movie.title))
  }
  const formatTimes = (times) => {
    return Array.isArray(times) ? times.join(', ') : times;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{movie.title}</h2>
        <div className="modal-trailer">
          {videoID ? (
            <iframe
              width="560"
              height="315"
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Trailer not available.</p>
          )}
        </div>
        <p><strong>Category:</strong> {movie.category}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Producer:</strong> {movie.producer}</p>
        <p><strong>Synopsis:</strong> {movie.synopsis}</p>
        <p><strong>Reviews:</strong> {movie.reviews}</p>
        <p><strong>MPAA Rating:</strong> {movie.mpaa_rating}</p>
        <p><strong>Show Date and Time:</strong> {formatDates(movie.shows)}</p>
        <Link to={{ pathname: "/seatBooking"}} onClick={handleButton} className="booking-button">Book Now</Link>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MovieModal;