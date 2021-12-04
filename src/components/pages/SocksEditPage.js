import React, {useState} from "react";
import SockCollectionComponent from "../components/SockCollectionComponent";
import Sock, {paramDict} from "../utils/algo/class/Sock";
import {useDispatch, useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";
import {toStandardCase} from "../utils/utilsFunctions";
import {addSock, setSockCollection} from "../utils/store/SockCollection/SockCollectionActions";

export default function SocksEditPage() {
    const [newSock, setNewSock] = useState(new Sock())
    const dispatch = useDispatch()
    const socks = useSelector(sockCollectionSelector)
    // console.log("updaete")
    const handleButtonClick = (param, value) => {
        // console.log("edit", param, value)
        setNewSock(prevState => {
            prevState.param[param] = value
            console.log(prevState, "change:",)
            return {...prevState}
        })
    }

    const handleAddToCollection = () => {
        dispatch(setSockCollection([...socks, newSock]))
        // setNewSock(new Sock())
    }

    return <>
        <div className={"h-screen flex content-center bg-greyLight-1"}>
            <div className={"m-auto shadow flex flex-col content-center p-5"}>

                <div className={"text-center m-2 text-xl font-bold"}>Edit Page</div>
                <div className={"flex flex-inline"}>
                    <div className={"mx-4"}>
                        <SockCollectionComponent socks={socks}/>

                    </div>
                    <div className={"mx-4 h-3/4 bg-black w-1"}/>
                    <div className={"flex flex-col"}>
                        <div>
                            {
                                Object.keys(paramDict).map((param, i) => (
                                    <div className={"my-1"} key={i}>
                                        <div className={"font-bold"}>{toStandardCase(param)}</div>
                                        <div>
                                            {paramDict[param].map((v, j) => (
                                                <button className={"button-primary mx-2 " + (newSock.param[param] === v ? "border-black border-2" : "")}
                                                        style={{
                                                            backgroundColor: param.toLowerCase().includes("color") && v,
                                                            minWidth: "5em"
                                                        }}
                                                        onClick={() => handleButtonClick(param, v)}
                                                        key={j}>
                                                    {toStandardCase(v)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={"flex justify-evenly"}>
                            <div>
                                {newSock.getComponent()}
                            </div>
                            <div className={"mt-5"}>
                                <button className={"button-primary bg-green-500"} onClick={handleAddToCollection}>
                                    Add to collection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
