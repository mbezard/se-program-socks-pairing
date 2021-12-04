import Sock from "../utils/algo/class/Sock";
import React from "react";

export default function SockCollectionComponent({
                                                    socks,
                                                    height = 75,
                                                    width = 75,
                                                    editable = false,
                                                    onDeleteClick = () => {}
                                                }) {
    // console.log(editable && "editable ")

    const DelIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className={"h-6 w-6"} fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
            <circle r={12} cx={12} cy={12} fill={"white"} stroke={"transparent"}/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} color={"red"}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    )

    return (
        <div className={"flex flex-col border-2 border-grey rounded shadow-unselected"}>
            {Sock.orderCollection(socks).map((pair, i) => {
                // console.log(i, pair)
                return (
                    <div key={i} className={"inline-flex my-1"}>
                        <div className={"relative"}>
                            <div>
                                {pair[0] && pair[0].getComponent({height: height, width: width})}
                            </div>
                            {editable &&
                            <div className={"absolute top-1/3 left-1/4 hover:scale-110"} onClick={() => onDeleteClick(pair[0])}>
                                <DelIcon/>
                            </div>
                            }
                        </div>
                        {pair[1] &&
                        <div className={"relative"} style={{marginLeft: "-40px"}}>
                            <div>
                                {pair[1].getComponent({height: height, width: width})}
                            </div>
                            {editable &&
                            <div className={"absolute top-1/3 left-1/4"} onClick={() => onDeleteClick(pair[1])}>
                                <DelIcon/>
                            </div>
                            }
                        </div>
                        }

                    </div>
                )
            })}
        </div>
    )
}
