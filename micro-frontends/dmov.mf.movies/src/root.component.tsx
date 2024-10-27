import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./Navbar/Navbar";

import MovieDetails from './components/movie-details';
import CreateMovies from './components/create-movies';
import Actors from './components/actors';
import CreateActors from './components/create-actors';


export default function Root(props) {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/movies" element={<MovieDetails />} />
        <Route path="/movies/create-movies" element={<CreateMovies />} />
        <Route path="/movies/actors" element={<Actors />} />
        <Route path="/movies/create-actors" element={<CreateActors />} />
      </Routes>
    </Router>
  );
}
