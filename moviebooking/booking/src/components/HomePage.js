import React, { useState, useContext, useEffect, useSyncExternalStore } from 'react';
import { MoviesContext } from './MoviesContext';
import MovieModal from './MovieModal';
import './HomePage.css';
import axios from "axios";

function HomePage({ route, navigation }) {
  const user = route;
  const { movies } = useContext(MoviesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [moves, setMoves] = useState([]);
  const [showMoves, setShowMoves] = useState([]);
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/movies")
      .then(data => {
        setMoves(data.data);
        setShowMoves(data.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setShowMoves(moves);
      setNoMoviesFound(false);
    } else {
      const filteredMoves = moves.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.cast.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      setShowMoves(filteredMoves);
      setNoMoviesFound(filteredMoves.length === 0);
    }
  }, [searchTerm, moves]);
  

  const today = new Date();
  
  const showingNowMovies = moves.filter((movie) => {
    const showDate = new Date(movie.release_date);
    return (
      showDate <= today &&
      (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.cast.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const comingSoonMovies = moves.filter((movie) => {
    const showDate = new Date(movie.release_date);
    return (
      showDate > today &&
      (movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.cast.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <h1>MovieHub</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for movies, directors, cast, producers, categories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
      {noMoviesFound && <div className="no-movies-message">No Results for "{searchTerm}"</div>}
      <section>
      <h2 className="section-heading">Showing Now</h2>
        <div className="movie-grid">
          {showingNowMovies.map((movie, index) => (
            <div key={index} className="movie-card" onClick={() => openModal(movie)}>
              <img src={movie.url} alt={`${movie.title} Poster`} className="movie-poster" />
              <div className="movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="section-heading">Coming Soon</h2>
        <div className="movie-grid">
          {comingSoonMovies.map((movie, index) => (
            <div key={index} className="movie-card" onClick={() => openModal(movie)}>
              <img src={movie.url} alt={`${movie.title} Poster`} className="movie-poster" />
              <div className="movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
      </section>
      {modalVisible && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default HomePage;