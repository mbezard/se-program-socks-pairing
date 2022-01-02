import {useParams} from "react-router-dom";
import SimpleAlgo from "../utils/algo/class/algorithms/SimpleAlgo"
import {getSelectedCollection} from "../utils/collectionSelection";
import React from "react";
import robots from "../../ressources/robots";

export default function SockPairingAlgorithm() {
    const params = useParams()
    const algoIndex = params?.algo
    let algo = null
    let collection = getSelectedCollection()
    // console.log(collection)

    if (parseInt(algoIndex) === 0) {
        algo = new SimpleAlgo()
    }

    algo?.generateStatesAndActions(collection)

    console.log("states: ", algo?.states)
    console.log("actions: ", algo?.actions)

    return (
        <div className={"h-screen flex content-center bg-greyLight-1"}>
            <div className={"m-auto inline-flex content-center"}>
                <div className={"shadow-xl rounded m-4 p-5"}>
                    Algo n°{algoIndex}

                </div>
                <div className={"rounded flex-col m-4 p-5 bg-gray-600"}>
                    <div>
                        <img src={robots[algoIndex]} alt="robot" className={"h-20 m-auto"}/>
                    </div>
                    <div className={"rounded bg-gray-500 m-3 p-3 overflow-x-auto"} style={{width: "20rem", height:"40rem"}}>
                        {algo?.actions.map((action, i) => (
                                <div key={i} className={"text-white my-2"}>{action.getLogText()}</div>
                            )
                        )}
                        {/*<div className={"text-white"}>Log ferglkhzerjkfb zeklmfljksdergvklzefdh regerhjtrhjrt rjtyjktyku </div>*/}
                    </div>
                </div>

            </div>
        </div>
    )
}
