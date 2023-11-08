import React, { useState, useEffect } from "react";
import Square from "./square";

export default function Board() {
    // const callAboutPage = async () => {
    //     try {
    //         const res = await fetch('http://localhost:8000/about', {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             credentials: "include"
    //         });
    //         const data = await res.json();
    //         console.log(data.id);
    //     } catch (e) {
    //         console.log("Fk there is error in frontend");
    //     }

    // }
    // useEffect(() => {
    //     callAboutPage();
    // }, []);

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [value, setValue] = useState('X');
    function handleClick(index) {
        if (squares[index] === null) {
            const nextSquares = [...squares];
            nextSquares[index] = value;
            setSquares(nextSquares);
            if (value === 'X') {
                setValue('O');
            }
            else {
                setValue('X');
            }
        }
    }
    function resetGame() {
        setSquares(Array(9).fill(null));
    }
    return (
        <>
            <div><h4>Next turn:<span className="btn" onClick={() => resetGame()}>{value}</span></h4></div>
            <div className="board-row">
                <Square id={0} value={squares[0]} squareClick={() => handleClick(0)}></Square>
                <Square id={1} value={squares[1]} squareClick={() => handleClick(1)}></Square>
                <Square id={2} value={squares[2]} squareClick={() => handleClick(2)}></Square>
            </div>
            <div board-row>
                <Square id={3} value={squares[3]} squareClick={() => handleClick(3)}></Square>
                <Square id={4} value={squares[4]} squareClick={() => handleClick(4)}></Square>
                <Square id={5} value={squares[5]} squareClick={() => handleClick(5)}></Square>
            </div>
            <div board-row>
                <Square id={6} value={squares[6]} squareClick={() => handleClick(6)}></Square>
                <Square id={7} value={squares[7]} squareClick={() => handleClick(7)}></Square>
                <Square id={8} value={squares[8]} squareClick={() => handleClick(8)}></Square>
            </div>

        </>
    )
}