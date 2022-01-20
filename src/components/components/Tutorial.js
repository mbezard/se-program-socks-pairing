import {useEffect, useState} from "react";
import WiseBotIcon from "../../ressources/WisebotIcon";
import {
    getProgressFromMemory,
    incrementProgressInMemory,
    isTutorialActivated,
    setProgressInMemory
} from "../utils/tutorial/Progress";
import {getTutorialStep, STEP_NOTHING, STEP_QUESTION, STEP_RESPONSE, STEP_WAIT} from "../utils/tutorial/tutorialStory";
import {useNavigate} from "react-router-dom";

export default function Tutorial({...props}) {
    const isTutorialActive = isTutorialActivated()
    const [progress, setProgress] = useState(parseInt(getProgressFromMemory()))
    const [tutorialStep, setTutorialStep] = useState({type: null, text: ""})
    const incrementProgress = () => setProgress(prev => prev + 1)
    const [isShown, setIsShown] = useState(false)
    const [answer, setAnswer] = useState({answerId: -1, answerText: "", correctAnswerText: "", correctAnswerIndex: -2})
    const navigate = useNavigate()

    const onClose = (force = false) => {
        console.log("onclose", force, tutorialStep.type)
        if(tutorialStep.type === STEP_QUESTION && !force) return;
        incrementProgress()
    }

    useEffect(() => {
        setProgressInMemory(progress)
        setTutorialStep(getTutorialStep(progress))
    }, [progress])

    useEffect(() => {
        if (tutorialStep.type == null || tutorialStep.type === STEP_NOTHING) {
            setIsShown(false)
        } else if (tutorialStep.type === STEP_QUESTION) {
            setIsShown(true)
            setAnswer(prevState => ({
                ...prevState,
                correctAnswerIndex: tutorialStep.text.correctAnswerIndex,
                correctAnswerText: tutorialStep.text.answers[tutorialStep.text.correctAnswerIndex]
            }))
        } else if (tutorialStep.type === STEP_WAIT) {
            setIsShown(false)
            setTimeout(() => {
                incrementProgress()
            }, tutorialStep.time || 3000)
        } else {
            setIsShown(true)
        }
    }, [tutorialStep])

    useEffect(() => {
        if(getProgressFromMemory() !== progress) {
            setProgress(getProgressFromMemory())
            console.log(getProgressFromMemory(), getProgressFromMemory()===16)
        }
    }, [navigate, progress, props])

    if(getProgressFromMemory() === 16 || getProgressFromMemory() === 25 || getProgressFromMemory() === 34) {
        navigate("/socks-pairing");
        incrementProgressInMemory()
        incrementProgress()
    }
    // console.log(tutorialStep, isShown, isTutorialActive)

    return (<>
        {isTutorialActive && isShown && <div className={"overflow-hidden fixed max-h-full max-w-full z-40 inset-0"}>

            <div className={"z-50 absolute -right-1 -bottom-3"} style={{transform: "rotate(-30deg)"}}>
                <WiseBotIcon/>
            </div>


            <div className={"absolute top-1/2 left-1/2 z-50"} style={{transform: "translate(-50%, -50%)"}}>
                <div className={"relative z-50 bg-white rounded p-5"} style={{minWidth: "12em", minHeight: "4em"}}>
                    <div className={"text-xl"}>
                        {tutorialStep?.type && tutorialStep?.type?.includes("TEXT") && tutorialStep?.text}
                        {tutorialStep?.type && tutorialStep?.type?.includes("QUESTION") && tutorialStep?.text.question}
                        {tutorialStep?.type === STEP_RESPONSE && <div>
                            <div className={"mb-1"}>{tutorialStep.text}</div>
                            <span>
                                Your prediction was
                                <span className={"font-bold"}> {answer.answerText} </span>
                                and the correct answer was
                                <span className={"font-bold"}> {answer.correctAnswerText} </span>
                            </span>
                            <br/>
                            {
                                answer.answerId === answer.correctAnswerIndex ?
                                    <div className={"text-green-700 mt-1"}>Congratulations, you found the correct answer</div>
                                    :
                                    <div className={"text-red-500 mt-1"}>Oh no! You didn't find the correct answer</div>
                            }
                        </div>}
                    </div>
                    {
                        tutorialStep?.type.includes("QUESTION") && <div className={"mt-2"}>
                            {tutorialStep?.text.answers.map((elem, i) => (
                                <div className={"border-2 rounded p-2 m-2 mx-5 cursor-pointer"} key={i}
                                     onClick={() => setAnswer(prevState => ({
                                         ...prevState,
                                         answerId: i,
                                         answerText: elem
                                     }))}>
                                    <input checked={answer.answerId === i} type="radio" readOnly
                                           className={"bg-primary mr-2 h-4 w-4"}/>
                                    {elem}
                                </div>
                            ))}
                            <div className={"button-primary"} onClick={() => onClose(true)}>
                                OK
                            </div>
                        </div>
                    }

                    <div className={"absolute -bottom-2 right-5 w-5 h-5 bg-white"}
                         style={{transform: "rotate(-45deg)"}}/>
                </div>
            </div>


            <div onClick={() => onClose(false)} className="opacity-25 fixed inset-0 z-40 bg-black"/>

        </div>}

        {tutorialStep?.type === STEP_WAIT &&
        <div className={"overflow-hidden fixed max-h-full max-w-full z-40 inset-0"}/>}
    </>)
}
