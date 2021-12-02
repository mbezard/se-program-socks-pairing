import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";
import sockCollectionReducer from "../utils/store/SockCollection/SockCollectionReducer";
import Sock from "../utils/algo/class/Sock";
import {ADD_SOCK_TO_COLLECTION, addSock} from "../utils/store/SockCollection/SockCollectionActions";
import SockComponent from "../components/SockComponent";

export default function SocksPairing() {
    const dispatch = useDispatch()
    const socks = useSelector(sockCollectionSelector)
    console.log(socks)
    // dispatch(addSock(new Sock()))
    useEffect(() => {
        const s = new Sock()
        dispatch({type: ADD_SOCK_TO_COLLECTION, payload: s})
    }, [])
    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow flex flex-col content-center p-5"}>
            <div>
                <div>Choose socks pool</div>
                <div>
                    <SockComponent patternColor={"red"} color={"blue"} pattern={"None"} lineAmount={0} height={150}
                                   width={150}/>
                    <SockComponent patternColor={"red"} color={"blue"} pattern={"None"} lineAmount={1} height={150}
                                   width={150}/>
                    <SockComponent patternColor={"red"} color={"blue"} pattern={"None"} lineAmount={2}/>
                    <SockComponent/>
                </div>
            </div>
            <div>Choose Algorithm</div>
        </div>
    </div>
}
