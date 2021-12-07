import React, {useState} from "react";
import {useSelector} from "react-redux";
import {sockCollectionSelector} from "../utils/store/SockCollection/SockCollectionSelector";
import {Link} from "react-router-dom";
import SockCollectionComponent from "../components/SockCollectionComponent";
import Robot1 from "../../ressources/robot-1.png"
import Robot2 from "../../ressources/robot-2.png"
import Robot3 from "../../ressources/robot-3.png"
import defaultSockCollections from "../utils/defaultSockCollections";
import ModalWiseBot from "../components/ModalWiseBot";

export default function SocksPairing() {
    const socks = useSelector(sockCollectionSelector)
    const robotsImgs = [Robot1, Robot2, Robot3]
    let [robotSelected, setRobotSelected] = useState(-1)
    let [collectionSelected, setCollectionSelected] = useState(-2)


    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow inline-flex content-center p-5"}>
            <div>
                <div className={"flex-col"}>
                    <div className={"title"}>Select collection</div>
                    <div className={"inline-flex"}>
                        {defaultSockCollections.map((col, i) => (
                            <div onClick={() => setCollectionSelected(i)}>
                            <SockCollectionComponent socks={col.socks} title={col.title}
                                                     isSelected={collectionSelected === i}/>
                            </div>
                        ))}
                        <div onClick={() => setCollectionSelected(-1)}>
                            <SockCollectionComponent socks={socks} title={"Custom"}
                                                     isSelected={collectionSelected === -1}/>
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
        <ModalWiseBot isShownByDefault={true}>
            Hi! My name is WiseBot
            <br/>
            Bip! Boop!
            <br/>
            This is a very long sentence woah this is really really long
        </ModalWiseBot>
    </div>
}
