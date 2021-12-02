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
        // dispatch({type: ADD_SOCK_TO_COLLECTION, payload: s})
    }, [])

    const s1 = new Sock()
    const s2 = new Sock()
    const s3 = new Sock({color: "blue"})
    const s4 = new Sock({color: "blue"})
    const s5 = new Sock()
    // console.log(s1.isSameAs(s2))
    // console.log(s1.isSameAs(s3))
    // console.log(s4.isSameAs(s3))
    // console.log(Sock.orderCollection([s1, s3, s2, s4, s5]))

    // socks.push(s1, s3, s2, s4, s5)
    // console.log(Sock.orderCollection(socks))

    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow flex flex-col content-center p-5"}>
            <div>
                <div>Choose socks pool</div>
                <div className={"flex flex-col border-2 border-grey rounded shadow-unselected"}>
                    {Sock.orderCollection([s1, s3, s2, s4, s5]).map((pair, i) => {
                        console.log(i, pair)
                        return (
                            <div key={i} className={"inline-flex my-1"}>
                                <div>
                                    {pair[0] && pair[0].getComponent({height:75, width:75})}
                                </div>
                                {pair[1] &&
                                <div style={{marginLeft:"-40px"}}>
                                    {pair[1].getComponent({height:75, width:75})}
                                </div>}

                            </div>
                        )
                    })}
                </div>
            </div>
            <div>Choose Algorithm</div>
        </div>
    </div>
}
