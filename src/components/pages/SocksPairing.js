import React from "react";
import {useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";
import Sock from "../utils/algo/class/Sock";
import {Link} from "react-router-dom";
import SockCollectionComponent from "../components/SockCollectionComponent";

export default function SocksPairing() {

    const socks = useSelector(sockCollectionSelector)
    console.log(socks)

    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow flex flex-col content-center p-5"}>
            <div>
                <div>Choose socks pool</div>
                <SockCollectionComponent socks={socks} />
            </div>
            <Link to={"/socks-collection-edit"}><button className={"button-primary"}>Click to edit</button></Link>
            <div>Choose Algorithm</div>
        </div>
    </div>
}
