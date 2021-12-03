import Sock from "../utils/algo/class/Sock";
import React from "react";

export default function SockCollectionComponent({socks, height = 75, width = 75}) {
    return (
        <div className={"flex flex-col border-2 border-grey rounded shadow-unselected"}>
            {Sock.orderCollection(socks).map((pair, i) => {
                // console.log(i, pair)
                return (
                    <div key={i} className={"inline-flex my-1"}>
                        <div>
                            {pair[0] && pair[0].getComponent({height:height, width:width})}
                        </div>
                        {pair[1] &&
                        <div style={{marginLeft:"-40px"}}>
                            {pair[1].getComponent({height:height, width:width})}
                        </div>}

                    </div>
                )
            })}
        </div>
    )
}
