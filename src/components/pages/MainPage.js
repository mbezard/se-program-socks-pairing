import React from "react";
import {Link} from "react-router-dom";

export default function MainPage() {
    return (<div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow flex flex-col justify-center items-center p-5"}>
            <div className={"text-center m-5 mx-auto font-bold"}>CHOOSE PROBLEM</div>
            <div className={"mt-5 "}>
                <Link to={"/socks-pairing"} >
                    <button className={"button-primary"}>Socks Pairing</button>
                </Link>
            </div>
            <div className={"mt-5"}>
                <Link to={"/socks-pairing-with-tutorial"}>
                    <button className={"button-primary"}>Socks Pairing with Tutorial</button>
                </Link>
            </div>

        </div>
    </div>)

}
