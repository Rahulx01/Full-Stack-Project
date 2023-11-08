import React, { useState, useEffect } from 'react';

import Header from './headers/header.js';
import Login from './login/login.js';
import Main from './main/main.js';
import Footer from './footer/footer.js';
export default function Home(props) {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            <Login showLogin={showLogin} setShowLogin={setShowLogin} setIsAuth={props.setIsAuth} setCookie={props.setCookie} setUser={props.setUser} />
            <Header yoyo="Star" setShowLogin={setShowLogin} showLogin={showLogin} user={props.user} isAuth={props.isAuth} setIsAuth={props.setIsAuth} setCookie={props.setCookie} />
            <Main isAuth={props.isAuth} cookie={props.cookie}/>
            <Footer />
        </>
    )
}