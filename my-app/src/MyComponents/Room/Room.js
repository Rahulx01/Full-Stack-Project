import React from "react";
import HostPage from './host';
import JoinPage from "./join";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
export default function Room(props) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/host' element={<HostPage/>}></Route>
                    <Route path='/room/join' Component={<JoinPage></JoinPage>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}