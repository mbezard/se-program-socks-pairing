import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";
import Sock from "../utils/algo/class/Sock";

export default function SocksPairing() {

    const socks = useSelector(sockCollectionSelector)
    console.log(socks)

    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow flex flex-col content-center p-5"}>
            <div>
                <div>Choose socks pool</div>
                <div className={"flex flex-col border-2 border-grey rounded shadow-unselected"}>
                    {Sock.orderCollection(socks).map((pair, i) => {
                        // console.log(i, pair)
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
