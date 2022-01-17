import {useEffect, useState} from "react";
import WiseBotIcon from "../../ressources/WisebotIcon";
import {getProgressFromMemory, isTutorialActivated, setProgressInMemory} from "../utils/Progress";
import {getTutorialStep, STEP_NOTHING, STEP_WAIT} from "../utils/tutorialStory";

export default function Tutorial() {
    const isTutorialActive = isTutorialActivated()
    const [progress, setProgress] = useState(parseInt(getProgressFromMemory()))
    const [tutorialStep, setTutorialStep] = useState({type: null, text: ""})
    const incrementProgress = () => setProgress(prev => prev + 1)
    const [isShown, setIsShown] = useState(false)

    const onClose = () => {
        console.log("onclose")
        incrementProgress()
    }

    useEffect(() => {
        setProgressInMemory(progress)
        setTutorialStep(getTutorialStep(progress))
    }, [progress])

    useEffect(() => {
        if (tutorialStep.type == null || tutorialStep.type === STEP_NOTHING) {
            setIsShown(false)
        } else if(tutorialStep.type === STEP_WAIT) {
            setIsShown(false)
            setTimeout(() => {incrementProgress()}, 3000)
        }else {
            setIsShown(true)
        }
    }, [tutorialStep])

    // console.log(tutorialStep)

    return (<>
        {isTutorialActive && isShown && <div className={"overflow-hidden fixed max-h-full max-w-full z-40 inset-0"}>

            <div className={"z-50 absolute -right-1 -bottom-3"} style={{transform: "rotate(-30deg)"}}>
                <WiseBotIcon/>
            </div>


            <div className={"absolute top-1/2 left-1/2 z-50"} style={{transform: "translate(-50%, -50%)"}}>
                <div className={"relative z-50 bg-white rounded p-5"} style={{minWidth: "12em", minHeight: "4em"}}>
                    <div>
                        {tutorialStep.text}
                    </div>

                    <div className={"absolute -bottom-2 right-5 w-5 h-5 bg-white"}
                         style={{transform: "rotate(-45deg)"}}/>
                </div>
            </div>


            <div onClick={onClose} className="opacity-25 fixed inset-0 z-40 bg-black"/>

        </div>}

        {tutorialStep?.type === STEP_WAIT &&
        <div className={"overflow-hidden fixed max-h-full max-w-full z-40 inset-0"}/>}
    </>)
}
