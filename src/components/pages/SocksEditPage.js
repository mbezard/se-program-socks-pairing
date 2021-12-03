import React, {useState} from "react";
import SockCollectionComponent from "../components/SockCollectionComponent";
import Sock, {paramDict} from "../utils/algo/class/Sock";
import {useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";

export default function SocksEditPage() {
    const [newSock, setNewSock] = useState(new Sock())
    const socks = useSelector(sockCollectionSelector)
    console.log("updaete")
    const handleButtonClick = (param, value) => {
        // console.log("edit", param, value)
        setNewSock(prevState => {
            prevState.param[param] = value
            console.log(prevState, "change:", )
            return {...prevState}
        })
    }

    return <>
        <div className={"h-screen flex content-center bg-greyLight-1"}>
            <div className={"m-auto shadow flex flex-col content-center p-5"}>

                <div>Edit Page</div>
                <div className={"flex flex-inline"}>
                    <SockCollectionComponent socks={socks}/>
                    <div className={"mx-4 h-3/4 bg-black w-1"}/>
                    <div className={"flex flex-col"}>
                        <div>
                            {
                                Object.keys(paramDict).map((param, i) => (
                                    <div key={i}>
                                        <div className={"font-bold"}>{param}</div>
                                        {param.toLowerCase().includes("color") ?
                                            <div>
                                                {paramDict[param].map((v, j) => (
                                                    <button className={"button-primay mx-4"}
                                                            style={{backgroundColor: v, minWidth: "5em"}}
                                                            onClick={() => handleButtonClick(param, v)}
                                                            key={j}>
                                                        {v}
                                                    </button>
                                                ))}
                                            </div>
                                            :
                                            <div>
                                                {paramDict[param].map((v, j) => (
                                                    <button className={"button-primay mx-4"}
                                                            style={{minWidth: "5em"}}
                                                            onClick={() => handleButtonClick(param, v)}
                                                            key={j}>
                                                        {v}
                                                    </button>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div>
                            {newSock.getComponent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
