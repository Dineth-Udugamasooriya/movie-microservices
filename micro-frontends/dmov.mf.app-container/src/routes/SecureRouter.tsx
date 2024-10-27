import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DynamicContextLoader from '../components/DynamicContextLoader';

import '../assets/SecureRouter.css';

import Navbar from '../navbar/navbar';

const SecureRouter = () => {


    return (
        <div className='container'>
            <div className='container_2'>
                <Router>
                    <div className='column1'>
                        <Navbar />
                    </div>

                    <div className='column2'>
                        <Routes>
                            <Route
                                path='home'
                                element={<DynamicContextLoader context='@dmov/home' />}></Route>
                            <Route
                                path='movies/*'
                                element={<DynamicContextLoader context='@dmov/movies' />}></Route>
                            <Route
                                path='actors'
                                element={<DynamicContextLoader context='@dmov/actors' />}></Route>
                        </Routes>
                    </div>

                </Router>
            </div>

        </div>

    );

};

export default SecureRouter;