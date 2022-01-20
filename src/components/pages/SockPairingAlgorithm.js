import {useParams} from "react-router-dom";
import SimpleAlgo from "../utils/algo/class/algorithms/SimpleAlgo"
import {getSelectedCollection} from "../utils/collectionSelection";
import React, {useEffect, useState} from "react";
import robots from "../../ressources/robots";
import {ForwardIcon, PauseIcon, PlayIcon, RewindIcon} from "../components/AlgorithmIcons";
import SimpleDivideAndSweepAlgo from "../utils/algo/class/algorithms/SimpleDivideAndSweepAlgo";
import DivideAndSweepAlgo from "../utils/algo/class/algorithms/DivideAndSweepAlgo";
import Tutorial from "../components/Tutorial";
import {incrementProgressInMemory, isTutorialActivated} from "../utils/tutorial/Progress";

export default function SockPairingAlgorithm() {
    const params = useParams()
    const algoIndex = params?.algo
    let collection = getSelectedCollection()
    const [step, setStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playInterval, setPlayInterval] = useState(0)
    const [showAnalytics, setShowAnalytics] = useState(false)
    const forceUpdate = useForceUpdate();
    let algo = null

    const [states, setStates] = useState([])
    const [actions, setActions] = useState([])

    if (parseInt(algoIndex) === 0) {
        algo = new SimpleAlgo()
    } else if (parseInt(algoIndex) === 1) {
        algo = new SimpleDivideAndSweepAlgo()
    } else if (parseInt(algoIndex) === 2) {
        algo = new DivideAndSweepAlgo()
    }

    useEffect(() => {
        if (actions.length === 0 && states.length === 0) {
            const [tempStates, tempActions] = algo?.generateStatesAndActions(collection)
            setStates(tempStates)
            setActions(tempActions)
            forceUpdate()
            // console.log("states: ", tempStates)
            // console.log("actions: ", tempActions)
        }
    }, [actions.length, algo, algoIndex, collection, forceUpdate, states.length])

    useEffect(() => {
        if(step >= actions.length && isPlaying) {
            setIsPlaying(false)
            clearInterval(playInterval)
        }
    }, [step, isPlaying, actions.length, playInterval])

    useEffect(() => {
        if (isPlaying === true && playInterval == null) {
            // console.log("start")
            setPlayInterval(setInterval(() => setStep(v => v + 1), 500))
        } else if (isPlaying === false) {
            // console.log("stop")
            clearInterval(playInterval)
            setPlayInterval(null)
        }
    }, [isPlaying, playInterval])

    let scrollingDiv;
    useEffect(() => {
        scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
    }, [scrollingDiv, step])


    useEffect(() => {
        if(actions.length > 0 && step >= actions.length && !showAnalytics) {
            setShowAnalytics(true)
            if(isTutorialActivated()) {
                incrementProgressInMemory()
            }
        }
    }, [actions.length, showAnalytics, step])



    return (
        <div className={"h-screen flex content-center bg-greyLight-1"}>
            <div className={"m-auto inline-flex content-center"}>
                <div className={"shadow-xl rounded m-4 p-5"}>
                    <div>Step n°{step} {actions[step]?.title && <> - {actions[step]?.title}</>}</div>
                    <div style={{width: "50rem", minHeight: "40rem"}}>
                        {states[step]?.getHtml()}
                        {showAnalytics &&
                        <div className={"my-4 w-full text-center"}>
                            Analytics
                            <br/>
                            Number of
                            comparisons: {actions.filter(value => value.category.includes("COMPARISON")).length}
                            <br/>
                            Number of moves: {actions.filter(value => value.category.includes("MOVE")).length}
                        </div>
                        }
                    </div>
                </div>

                <div className={"rounded flex-col m-4 p-5 bg-gray-600"}>
                    <div>
                        <img src={robots[algoIndex]} alt="robot" className={"h-20 m-auto"}/>
                    </div>
                    <div className={"rounded bg-gray-500 m-3 p-3 overflow-x-auto"}
                         ref={(el) => scrollingDiv = el}
                         style={{width: "20rem", height: "35rem"}}>
                        {actions.filter((v, i) => i < step).map((action, i) => (
                                <div key={i} className={"text-white my-3"}>{action.getLogText()}</div>
                            )
                        )}
                    </div>

                    <div className={"flex justify-center"} style={{width: "20rem", height: "5rem"}}>
                        <div className={"button-primary mx-1 my-2"}
                             onClick={() => setStep(prev => Math.max(prev - 1, 0))}>
                            <RewindIcon className={"h-10 w-10"}/>
                        </div>

                        {isPlaying ?
                            <div className={"button-primary mx-1 my-2"} onClick={() => setIsPlaying(false)}>
                                <PauseIcon className={"h-10 w-10"}/>
                            </div>
                            :
                            <div className={"button-primary mx-1 my-2"} onClick={() => setIsPlaying(true)}>
                                <PlayIcon className={"h-10 w-10"}/>
                            </div>
                        }

                        <div className={"button-primary mx-1 my-2"}
                             onClick={() => setStep(prev => Math.min(prev + 1, states.length - 1))}>
                            <ForwardIcon className={"h-10 w-10"}/>
                        </div>

                    </div>
                </div>

            </div>
            <Tutorial />
        </div>
    )
}

function useForceUpdate() {
    const [, setValue] = useState(true);
    return () => setValue(value => !value);
}
