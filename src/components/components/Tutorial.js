import {useEffect, useState} from "react";
import WiseBotIcon from "../../ressources/WisebotIcon";
import {getProgress, isTutorialActivated} from "../utils/Progress";
import {getText} from "../utils/tutorialStory";

export default function Tutorial() {
    const isTutorialActive = isTutorialActivated()
    const [progress, setProgress] = useState(getProgress())
    const incrementProgress = () => setProgress(prev => prev + 1)
    const [isShown, setIsShown] = useState(false)

    const onClose = () => {
        console.log("onclose")
        incrementProgress()
        setIsShown(false)
    }

    useEffect(() => {
        if(getText(progress) !== null) {
            setIsShown(true)
        }
    }, [progress])


    return (<>
        {isTutorialActive && isShown && <div className={"overflow-hidden fixed max-h-full max-w-full z-40 inset-0"}>

            <div className={"z-50 absolute -right-1 -bottom-3"} style={{transform: "rotate(-30deg)"}}>
                <WiseBotIcon/>
            </div>


            <div className={"absolute top-1/2 left-1/2 z-50"} style={{transform: "translate(-50%, -50%)"}}>
                <div className={"relative z-50 bg-white min-h-5 min-w-15 rounded p-5"}>
                    <div>
                        {getText(progress)}
                    </div>

                    <div className={"absolute -bottom-2 right-5 w-5 h-5 bg-white"}
                         style={{transform: "rotate(-45deg)"}}/>
                </div>
            </div>


            <div onClick={onClose} className="opacity-25 fixed inset-0 z-40 bg-black"/>

        </div>}
    </>)
}
