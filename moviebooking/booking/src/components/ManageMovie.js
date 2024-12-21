import React, { useState, useContext, useEffect } from 'react';
import { MoviesContext } from './MoviesContext';
import './ManageMovie.css';
import axios from 'axios';

function ManageMovie() {
  const { movies, addMovie, editMovie, deleteMovie } = useContext(MoviesContext);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const initialState = {
    id: null,
    title: '',
    category: '',
    cast: '',
    director: '',
    producer: '',
    synopsis: '',
    reviews: '',
    url: '',
    trailer: '',
    mpaa_rating: '',
    shows: [],
    screen: '',
    showDates: '',
    showTime: '12:00:00'
  };

  const [movie, setMovie] = useState(initialState);
  const [apiMovies, setApiMovies] = useState([]);

  const getMovies = () =>  {
    axios.get('http://localhost:8080/movies')
      .then(response => {
        setApiMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
  useEffect(() => {
     getMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Update Movie:', name , value);
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let successMessage = '';
    try {
      if (movie && movie.id) {
        console.log('Update Movie id:', movie.id);
        const response = await axios.put(`http://localhost:8080/updateMovie/${movie.id}`, movie);
        console.log('Update Movie:', response);
        editMovie(movie);
        getMovies();
        successMessage = response.data;
        // Call addShow API if movie.id is present and required fields are not null or empty
        if (movie.screen && movie.showTime && movie.showDates) {
          const formattedShowTime = formatTimeToJavaSqlTime(movie.showTime);
          const showResponse = await axios.post('http://localhost:8080/addShow', movie);
          successMessage = showResponse.data;
          getMovies();
        }
      } else {
        console.log('Add Movie');
        console.log('movie:', movie);
        const addResponse = await axios.post('http://localhost:8080/addMovie', movie);
        addMovie(addResponse.data);
        getMovies();
        successMessage = addResponse.data;
      }
      alert(successMessage);
    } catch (error) {
      console.error('Error:', error);
      alert(error.response ? error.response.data : 'Error occurred while processing the request.');
    } finally {
      setMovie(initialState);
      setShowForm(false);
    }
  };
  
  function formatTimeToJavaSqlTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':');
    const formattedTime = new Date(0, 0, 0, hours, minutes, seconds);
    return formattedTime.toTimeString().slice(0, 8); // Extract HH:mm:ss part
  }
  
  const handleEdit = (movieToEdit) => {
    setMovie(movieToEdit);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this movie?");
    if (confirmed) {
      try {
        console.log('Delete id:', id);
        const response = await axios.delete(`http://localhost:8080/deleteMovie/${id}`);
        console.log('Delete response:', response);
        deleteMovie(id);
        getMovies();
        alert(response.data);
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div>
      {!showForm && (
        <button className='add-movie-button' onClick={() => { setMovie(initialState); setShowForm(true); }}>Add Movie</button>
      )}
      {showForm && (
        <div className='form-container'>
          <h2>{movie.id ? "Edit Movie" : "Add New Movie"}</h2>
          <div className='back-button'>
            <button onClick={() => setShowForm(false)}>Back to Movie List</button>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <div classname="input-container">
                <input type="text" name="title" value={movie.title} onChange={handleChange} required/>
              </div>
            </label>
            <label>
              Category:
              <div classname="input-container">
                <input type="text" name="category" value={movie.category} onChange={handleChange} required/>
              </div>
            </label>
            <label>
              Cast:
              <div classname="input-container">
                <input type="text" name="cast" value={movie.cast} onChange={handleChange} required/>
              </div>
            </label>
            <label>
              Director:
              <div classname="input-container">
               <input type="text" name="director" value={movie.director} onChange={handleChange} required/>
              </div>
            </label>
            <label>
              Producer:
              <div classname="input-container">
                <input type="text" name="producer" value={movie.producer} onChange={handleChange} required/>
              </div>
            </label>
            <label>
              Release Date:
              <div classname="input-container">
               <input type="date" name="release_date" value={movie.release_date} onChange={handleChange} required/>
              </div>
            </label>
            <label>
              Duration:
              <div classname="input-container">
                <input type="text" name="duration" value={movie.duration} onChange={handleChange} required/>
              </div>
            </label>
            <label>
              Synopsis:
              <textarea name="synopsis" value={movie.synopsis} onChange={handleChange} required/>
            </label>
            <label>
              Reviews:
              <textarea name="reviews" value={movie.reviews} onChange={handleChange} required/>
            </label>
            <label>
              Poster URL:
              <div classname="input-container">
                <input type="text" name="url" value={movie.url} onChange={handleChange} placeholder="Enter URL for the movie poster" required/>
              </div>
            </label>
            <label>
              Trailer URL:
              <div classname="input-container">
                <input type="text" name="trailer" value={movie.trailer} onChange={handleChange} placeholder="Enter YouTube URL for the trailer" required/>
              </div>
            </label>
            <label>
              MPAA Rating:
              <select name="mpaa_rating" value={movie.mpaa_rating} onChange={handleChange} required>
                <option value="">Select Rating</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
              </select>
            </label>
            {movie.shows && movie.shows.length > 0 && (
              <label>
                Current Shows:
                {movie.shows.map((show, index) => (
                  <p key={index}>{show}</p>
                ))}
              </label>
            )}
           {/* Conditionally render screen, show dates, and show times for edit form */}
            {movie.id && (
              <>
                <label>
                  Screen:
                  <select type="text" name="screen" onChange={handleChange}>
                    <option value="">Select Screen</option>
                    <option value="1">Screen 1</option>
                    <option value="2">Screen 2</option>
                    <option value="3">Screen 3</option>
                    <option value="4">Screen 4</option>
                    <option value="5">Screen 5</option>
                  </select>
                </label>
                <label>
                  Show Dates:
                  <input type="date" name="showDates" onChange={handleChange} />
                </label>
                <label>
                  Show Times:
                  <select type="time" name="showTime" onChange={handleChange}>
                    <option value="">Select Show Time</option>
                    <option value="10:00:00">10:00:00</option>
                    <option value="13:00:00">13:00:00</option>
                    <option value="16:00:00">16:00:00</option>
                    <option value="20:00:00">20:00:00</option>
                  </select>
                </label>
              </>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {!showForm && (
        <div className='movie-list-container'>
          <h3>Movie List</h3>
          {apiMovies ? (
            apiMovies.map((movie) => (
              <div key={movie.id} className='movie-item'>
                <p>{movie.title}</p>
                <button onClick={() => handleEdit(movie)}>Edit</button>
                <button onClick={() => handleDelete(movie.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageMovie;