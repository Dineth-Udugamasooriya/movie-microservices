import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Navbar.css'; // Import the CSS file

const Navbar = () => {
    return (
        <nav className="side-navbar">
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/actors">Actors</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;