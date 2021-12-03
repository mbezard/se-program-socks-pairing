import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import SocksPairing from "../pages/SocksPairing";
import SocksEditPage from "../pages/SocksEditPage";

export default function ReactRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<MainPage/>} />
                <Route path={"/socks-pairing"} element={<SocksPairing/>} />
                <Route path={"/socks-collection-edit"} element={<SocksEditPage />} />
            </Routes>

        </Router>
    )
}
