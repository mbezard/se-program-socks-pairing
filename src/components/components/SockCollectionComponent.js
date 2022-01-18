import Sock from "../utils/algo/class/Sock";
import React from "react";

export default function SockCollectionComponent({
                                                    socks,
                                                    height = 75,
                                                    width = 75,
                                                    title = false,
                                                    isSelected = false,
                                                    editable = false,
                                                    small = false,
                                                    onDeleteClick = () => {
                                                    }
                                                }) {
    if(editable) small = false
    if(small) {
        height = 40
        width = 40
    }

    const DelIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className={"h-6 w-6"} fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
            <circle r={12} cx={12} cy={12} fill={"white"} stroke={"transparent"}/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} color={"red"}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    )

    return (<div className={"flex-col mx-1"}>
        {title ? <div className={"text-center"}>{title}</div> : <div className={"h-6"}/>}
        <div
            className={"flex flex-col border-2 border-grey rounded " + (isSelected ? "shadow-selected" : "shadow-unselected")}
            style={{minWidth: (width * 1.5)}}>
            {Sock.orderCollection(socks).map((pair, i) => {
                // console.log(i, pair)
                return (
                    <div key={i} className={"inline-flex my-1"}>
                        <div className={"relative"}>
                            <div>
                                {pair[0] && pair[0].getComponent({height: height, width: width})}
                            </div>
                            {editable &&
                            <div className={"absolute top-1/3 left-1/4 hover:scale-110"}
                                 onClick={() => onDeleteClick(pair[0])}>
                                <DelIcon/>
                            </div>
                            }
                        </div>
                        {pair[1] &&
                        <div className={"relative"}
                             style={{marginLeft: "-" + (width / 2) + "px", marginRight: "-" + (width / 2) + "px"}}>
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
            }).reduce((previousValue, currentValue, currentIndex) => {
                if (!small) return [...previousValue, currentValue]
                else {
                    if(currentIndex%2 === 0) return [...previousValue, currentValue]
                    const prevPair = previousValue.pop()
                    return [...previousValue, <div key={currentIndex} className={"inline-flex mr-4"}> {prevPair} <div className={"mx-2"}/> {currentValue}</div>]
                }
            }, [])}
        </div>
    </div>)
}
