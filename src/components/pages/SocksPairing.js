import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";
import {Link, useNavigate} from "react-router-dom";
import SockCollectionComponent from "../components/SockCollectionComponent";
import Robot1 from "../../ressources/robot-1.png"
import Robot2 from "../../ressources/robot-2.png"
import Robot3 from "../../ressources/robot-3.png"
import defaultSockCollections from "../utils/defaultSockCollections";
import ModalWiseBot from "../components/ModalWiseBot";
import {getProgress} from "../utils/Progress";
import {getText} from "../utils/tutorialStory";
import {setSelectedCollection} from "../utils/collectionSelection";

export default function SocksPairing({withProgress = false}) {
    const socks = useSelector(sockCollectionSelector)
    const robotsImgs = [Robot1, Robot2, Robot3]
    let [robotSelected, setRobotSelected] = useState(-1)
    let [collectionSelectedIndex, setCollectionSelectedIndex] = useState(-2)
    let [progress, setProgress] = useState(getProgress())
    const navigate = useNavigate()

    useEffect(() => {
        if(collectionSelectedIndex === -1) setSelectedCollection(socks)
        if(collectionSelectedIndex >= 0) setSelectedCollection(defaultSockCollections[collectionSelectedIndex].socks)
    }, [collectionSelectedIndex])

    const tutorialText = getText(progress)

    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"flex flex-col m-auto shadow-xl content-center p-5 "}>
            <div className={"inline-flex "}>
                <div>
                    <div className={"flex-col"}>
                        <div className={"title"}>Select collection</div>
                        <div className={"inline-flex"}>
                            {defaultSockCollections.map((col, i) => (
                                <div key={i} onClick={() => setCollectionSelectedIndex(i)}>
                                    <SockCollectionComponent socks={col.socks} title={col.title}
                                                             isSelected={collectionSelectedIndex === i}/>
                                </div>
                            ))}
                            <div onClick={() => setCollectionSelectedIndex(-1)}>
                                <SockCollectionComponent socks={socks} title={"Custom"}
                                                         isSelected={collectionSelectedIndex === -1}/>
                                <div className={"flex justify-center my-2"}>
                                    <Link to={"/socks-collection-edit"}>
                                        <button className={"button-primary"}>Click to edit</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"h-full mx-5"}/>

                <div>
                    <div className={"flex-col"}>
                        <div className={"title"}>Choose Algorithm</div>
                        <div className={"flex justify-center"}>
                            {
                                robotsImgs.map((r, i) => (
                                    <div key={i}
                                         className={"mx-2 p-2 border-2 border-grey rounded " + (robotSelected === i ? "shadow-selected" : "shadow-unselected")}
                                         onClick={() => setRobotSelected(i)}>
                                        <img src={r} alt="robot" className={"h-20"}/>
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
                        onClick={() => navigate(`/socks-pairing-algorithm/${robotSelected}`)}>Execute
                </button>

            </div>
        </div>


        {withProgress &&
        <ModalWiseBot isShownByDefault={tutorialText && true} onExit={() => setProgress(prev => prev + 1)}>
            {tutorialText}
        </ModalWiseBot>
        }
    </div>
}
