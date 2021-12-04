import React from "react";
import {Link} from "react-router-dom";

export default function MainPage() {
    return(<div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow flex flex-col content-center p-5"}>
            <div className={"text-center m-5 font-bold"}>CHOOSE PROBLEM</div>
            <button className={"button-primary m-5"}><Link to={"/socks-pairing"}>Socks Pairing</Link></button>
        </div>
    </div>)

}
