import React from "react";
import './style.css';
export default function Square(props){
    return(
        <>
            <button 
            id={props.id}
            className="square btn btn-outline border"
            onClick={()=> props.squareClick()}
            >{props.value}</button>
        </>
    )
}