import React, { useState, useEffect } from 'react';
import Header from './MyComponents/Home/headers/header.js';
// import Brands from './MyComponents/brands.js';
import Footer from './MyComponents/Home/footer/footer.js';
import Login from './MyComponents/Home/login/login.js';
import Board from './MyComponents/game/game.js';
import Main from './MyComponents/Home/main/main.js';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState();
  const [cookie, setCookie] = useCookies(['JWtoken']);
  useEffect(() => {
    const ifUserLoggedIn = async () => {
      try {
        const res = await fetch("http://localhost:8000/", {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.JWtoken // Include the JWtoken cookie in the Authorization header
          }
        });
        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
          setIsAuth(true);
        }
        else setIsAuth(false);
      } catch (error) {
        setIsAuth(false);
        console.log("har har", error);
      }
    };

    ifUserLoggedIn();
  }, [cookie.JWtoken]);
  return (
    <BrowserRouter>
      <Login showLogin={showLogin} setShowLogin={setShowLogin} setIsAuth={setIsAuth} setCookie={setCookie} setUser={setUser} />
      <Header yoyo="Star" setShowLogin={setShowLogin} showLogin={showLogin} user={user} isAuth={isAuth} setIsAuth={setIsAuth} setCookie={setCookie} />
      <Routes>
        <Route path='/:roomCode' element={<Main isAuth={isAuth} cookie={cookie}/>}></Route>
        <Route path='about' Component={Board}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}