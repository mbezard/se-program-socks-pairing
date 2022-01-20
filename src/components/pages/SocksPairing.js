import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";
import {Link, useNavigate} from "react-router-dom";
import SockCollectionComponent from "../components/SockCollectionComponent";
import defaultSockCollections from "../utils/defaultSockCollections";
import Tutorial from "../components/Tutorial";
import {setSelectedCollection} from "../utils/collectionSelection";
import robots, {robotAlgorithm, robotColors, robotDescription, robotNames} from "../../ressources/robots";
import BasicModal from "../components/BasicModal";
import {getProgressFromMemory, incrementProgressInMemory, isTutorialActivated} from "../utils/tutorial/Progress";

export default function SocksPairing() {//todo add parameters to robots
    const socks = useSelector(sockCollectionSelector)
    const [robotSelected, setRobotSelected] = useState(-1)
    const [collectionSelectedIndex, setCollectionSelectedIndex] = useState(-2)
    const [robotModalIndex, setRobotModalIndex] = useState(-1)
    const navigate = useNavigate()

    useEffect(() => {
        if (collectionSelectedIndex === -1) setSelectedCollection(socks)
        if (collectionSelectedIndex >= 0) setSelectedCollection(defaultSockCollections[collectionSelectedIndex].socks)
    }, [collectionSelectedIndex, socks])

    const handleExecuteClick = () => {
        if (isTutorialActivated() && getProgressFromMemory() === 6) {
            incrementProgressInMemory()
        }
        navigate(`/socks-pairing-algorithm/${robotSelected}`)

    }

    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"flex flex-col m-auto shadow-xl content-center p-5 "}>
            <div className={"inline-flex "}>
                <div>
                    <div className={"flex-col"}>
                        <div className={"title"}>Select collection</div>
                        <div className={"inline-flex"}>
                            {defaultSockCollections.filter(((value, index) => {
                                if (!isTutorialActivated()) return true
                                if (index > 0 && getProgressFromMemory() < 10) return false
                                if (index > 1 && getProgressFromMemory() < 15) return false
                                return true
                            })).map((col, i) => (
                                <div key={i} onClick={() => setCollectionSelectedIndex(i)}>
                                    <SockCollectionComponent socks={col.socks} title={col.title}
                                                             small={col.socks.length > 9}
                                                             isSelected={collectionSelectedIndex === i}/>
                                </div>
                            ))}
                            <div className={"mx-4"}/>
                            {
                                (!isTutorialActivated() || getProgressFromMemory() > 20) &&
                                <div onClick={() => setCollectionSelectedIndex(-1)}>
                                    <SockCollectionComponent socks={socks} title={"Custom"}
                                                             small={socks.length > 9}
                                                             isSelected={collectionSelectedIndex === -1}/>
                                    <div className={"flex justify-center my-2"}>
                                        <Link to={"/socks-collection-edit"}>
                                            <button className={"button-primary"}>Click to edit</button>
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className={"h-full mx-5"}/>

                <div>
                    <div className={"flex-col"}>
                        <div className={"title"}>Choose Algorithm</div>
                        <div className={"flex justify-center"}>
                            {
                                robots.filter(((value, index) => {
                                    if (!isTutorialActivated()) return true
                                    if (index > 0 && getProgressFromMemory() < 10) return false
                                    if (index > 1 && getProgressFromMemory() < 15) return false
                                    return true
                                })).map((r, i) => (
                                    <div key={i}
                                         className={"mx-2 p-2 border-2 border-grey rounded " + (robotSelected === i ? "shadow-selected" : "shadow-unselected")}
                                         onClick={() => setRobotSelected(i)}>
                                        <img src={r} alt="robot" className={"h-20 m-auto"}/>
                                        <div className={"flex justify-center my-4"}>
                                            <div className={`border-l-8 h-80 border-${robotColors[i]}-400`}/>
                                        </div>
                                        <div>
                                            <div className={"button-primary"}
                                                 onClick={() => setRobotModalIndex(i)}>Details
                                            </div>
                                            <BasicModal isShownByDefault={robotModalIndex === i}
                                                        onExit={() => setRobotModalIndex(-1)}>
                                                <div className={"flex flex-col"}>
                                                    <div className={"title text-xl text-center"}>{robotNames[i]}</div>
                                                    <div className={"flex flex-row"}>
                                                        <img src={r} alt="robot" className={"h-32 mt-4"}/>
                                                        <div className={"bg-white m-4 p-4 rounded "}>
                                                            <div className={"font-bold"}>Description:</div>
                                                            <div>{robotDescription[i]}</div>
                                                            <div className={"font-bold mt-2"}>Algorithm:</div>
                                                            <div className={"bg-black text-white rounded p-3"}>
                                                                <code>{robotAlgorithm[i]}</code>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </BasicModal>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <hr className={"py-2"}/>

            <div className={"flex justify-center"}>
                <button className={"button-primary"} disabled={robotSelected === -1 || collectionSelectedIndex === -2}
                        onClick={handleExecuteClick}>Execute
                </button>

            </div>
        </div>


        <Tutorial/>

    </div>
}
