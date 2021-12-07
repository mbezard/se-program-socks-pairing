import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import SocksPairing from "../pages/SocksPairing";
import SocksEditPage from "../pages/SocksEditPage";
import SockPairingAlgorithm from "../pages/SockPairingAlgorithm";

export default function ReactRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<MainPage/>} />
                <Route path={"/socks-pairing"} element={<SocksPairing/>} />
                <Route path={"/socks-pairing-with-tutorial"} element={<SocksPairing withProgress={true}/>} />
                <Route path={"/socks-collection-edit"} element={<SocksEditPage />} />
                <Route path={"/socks-pairing-algorithm/:algo"} element={<SockPairingAlgorithm />} />
                {/*<Route path={"/socks-pairing-algorithm"} element={<SockPairingAlgorithm />} />*/}
            </Routes>

        </Router>
    )
}
