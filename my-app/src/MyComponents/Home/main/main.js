import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Main(props) {
    const navigate = useNavigate();
    function act(getAct){
        navigate(`/room/${getAct}`);
    }
    return (
        <>
            <div>
                <div>
                    <Link to={'/join'} onClick={() => act("host")}><button>Host</button></Link>
                </div>
                <div>
                    <button onClick={() => act("join")}>Join</button>
                </div>
            </div>

            {false && (
                <div className="login-overlay">
                    <div className="login-form-container">
                        <div class="mb-3">

                            <input class="form-control"></input>
                            <div class="form-text">What should everyone call you by?</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            )}
        </>
    )
}