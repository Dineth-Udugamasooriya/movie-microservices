import React, { useState } from 'react';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import DynamicContextLoader from '../components/DynamicContextLoader';

const PublicRouter = () => {
    // const [context, setContext] = useState('@single-spa/welcome'); //Don't use a null context

    const [loginStatus, setLoginStatus] = useState(false);

    const handleLogin = () => {
        setLoginStatus(!loginStatus);
    };

    return (
        <>
            <h1>This is the Login Page</h1>
            {/* <button onClick={handleLogin}>{loginStatus ? 'Logout' : 'Login'}</button> */}

        </>
    );
};

export default PublicRouter;