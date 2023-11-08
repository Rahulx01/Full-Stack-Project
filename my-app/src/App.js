import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './MyComponents/Home/Home';
import Room from './MyComponents/Room/Room';

export default function App() {
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
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} cookie={cookie} setIsAuth={setIsAuth} setCookie={setCookie} setUser={setUser} user={user}/>}></Route>
        <Route path='/room/:act' element={<Room msg={"sgsg"}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}