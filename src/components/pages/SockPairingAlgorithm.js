import {useParams} from "react-router-dom";
import SimpleAlgo from "../utils/algo/class/algorithms/SimpleAlgo"
import {getSelectedCollection} from "../utils/collectionSelection";
import React, {useState} from "react";
import robots from "../../ressources/robots";
import {ForwardIcon, PlayIcon, RewindIcon} from "../components/AlgorithmIcons";

export default function SockPairingAlgorithm() {
    const params = useParams()
    const algoIndex = params?.algo
    let algo = null
    let collection = getSelectedCollection()
    const [step, setStep] = useState(0)

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
                    <div>Step n°{step}</div>
                    <div style={{width: "50rem", height: "40rem"}}>
                        {algo?.states[step].getHtml()}
                    </div>


                </div>
                <div className={"rounded flex-col m-4 p-5 bg-gray-600"}>
                    <div>
                        <img src={robots[algoIndex]} alt="robot" className={"h-20 m-auto"}/>
                    </div>
                    <div className={"rounded bg-gray-500 m-3 p-3 overflow-x-auto"}
                         style={{width: "20rem", height: "35rem"}}>
                        {algo?.actions.filter((v, i) => i<step).map((action, i) => (
                                <div key={i} className={"text-white my-3"}>{action.getLogText()}</div>
                            )
                        )}
                    </div>

                    <div className={"flex justify-center"} style={{width: "20rem", height: "5rem"}}>
                        <div className={"button-primary mx-1 my-2"}
                             onClick={() => setStep(prev => Math.max(prev - 1, 0))}>
                            <RewindIcon className={"h-10 w-10"}/>
                        </div>
                        <div className={"button-primary mx-1 my-2"}>
                            <PlayIcon className={"h-10 w-10"}/>
                        </div>
                        <div className={"button-primary mx-1 my-2"}
                             onClick={() => setStep(prev => Math.min(prev + 1, algo?.states.length-1))}>
                            <ForwardIcon className={"h-10 w-10"}/>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
