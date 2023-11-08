import React, { useState } from 'react';
import './login.css';
import Signup from './signup';
import Signin from './sigin';

export default function Login(props) {
    const [member, setLogin] = useState(true);

    const memberToogle = () => setLogin(!member);
    return (
        <>
            {props.showLogin && (
                <div className="login-overlay">
                    <div className="login-form-container">
                        {
                            member ? <Signin setIsAuth={props.setIsAuth} setUser={props.setUser} forToogle={memberToogle} setShowLogin={props.setShowLogin} setCookie={props.setCookie}/>
                                : <Signup setIsAuth={props.setIsAuth} setUser={props.setUser}  forToogle={memberToogle} setShowLogin={props.setShowLogin} setCookie={props.setCookie}/>
                        }
                    </div>
                </div>
            )}
        </>
    )
}