// MoviesContext.js

import React, { createContext, useState } from 'react';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const editMovie = (updatedMovie) => {
    setMovies(movies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
  };

  const deleteMovie = (movieId) => {
    setMovies(movies.filter(movie => movie.id !== movieId));
  };

  const setMoviesData = (newMoviesData) => {
    setMovies(newMoviesData);
  };

  return (
    <MoviesContext.Provider value={{ movies, addMovie, editMovie, deleteMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};
