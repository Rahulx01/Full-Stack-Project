import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    const profileImage = props.isAuth && props.user && props.user.ProfilePic ? props.user.ProfilePic : 'images/mitr.jpeg';
    const username = props.isAuth && props.user && props.user.username ? props.user.username : "Hola";
    const logout = () => {
        props.setCookie('JWtoken', undefined, { path: '/' });
        props.setIsAuth(false)
    };

    return (
        <>
            <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '60%' }}>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                            <div>
                                <Link className="navbar-brand" to="/">{props.yoyo}</Link>
                            </div>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/about">About</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div>
                    {!props.isAuth ? (
                        <div className="d-flex m-2 p-1">
                            <button className="btn btn-outline-success" onClick={() => props.setShowLogin(!props.showLogin)}>Login</button>
                        </div>
                    ) : (
                        <div className="btn-group m-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{ borderRadius: '10', cursor: 'pointer' }}>
                            <img
                                width="50"
                                height="50"
                                className=""
                                src={profileImage}
                                alt="Profile"
                                style={{
                                    border: '1px solid grey',
                                    borderRadius: '100%'
                                }}
                            />
                            <h3>{username}</h3>
                            <ul class="dropdown-menu">
                                <li><button type="button" class="btn btn-outline-danger" onClick={() => logout()}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

