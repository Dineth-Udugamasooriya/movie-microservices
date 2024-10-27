import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/movies">Movie Details</Link>
                </li>
                <li>
                    <Link to="/movies/create-movies">Create Movies</Link>
                </li>
                <li>
                    <Link to="/movies/actors">Actors</Link>
                </li>
                <li>
                    <Link to="/movies/create-actors">Create Actors</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;