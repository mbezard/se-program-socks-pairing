import React from "react";
import {ForwardIcon, PlayIcon, RewindIcon} from "../../components/AlgorithmIcons";

const tutorialTexts = [
    <>
        Hi! My name is WiseBot
        <br/>
        Bip! Boop!
        <br/>
        Welcome to the Tutorial
    </>,
    <>
        During this tutorial I will present you my friends : the <b>Sock Sorter Bots</b>
        <br/>
        ☺
        <br/>
        They are really kind, their only goal is to help you sort your socks
    </>,
    <>
        <span>Behind me is the main menu</span>
        <br/>
        <span>You can select a sock collection on the <b>left</b> and a bot on the <b>right</b></span>
    </>,
    <>
        We don't have much choice right now, so choose the basic collection and the yellow bot
    </>,
    <>
        <div className={"my-3"}>
            You can see the modus operandi of a bot by clicking the <span
            className={"button-primary"}>Details</span> button
        </div>
        <br/>
        <div className={"mb-3"}>
            When you are ready, click on <span className={"button-primary"}>Execute</span> at the bottom of the screen
        </div>
    </>,
    {
        question: <>It's time to make prediction. <br/>How many comparisons between 2 socks will there be?</>,
        answers: ["1-2", "3-4", "5-6"],
        correctAnswerIndex: 1
    },
    <>
        This is the running environment
    </>,
    <div className={"leading-9"}>
        On the <b>left</b> side you can see your sock, the first
        <span className={"border-4 border-yellow-900 bg-yellow-700 p-1 m-1"}>box</span>
        is the un-matched pile and below is the
        <span className={"border-4 border-yellow-900 bg-yellow-700 p-1 m-1"}>final box</span>.
        <br/>
        <br/>
        On the <b>right</b> side, on the <span className={"bg-gray-500 px-1 pb-1"}>grey</span> you can see what is happening.
        <br/>
        <br/>
        <div className={"inline-flex flex-nowrap"}>
            You can visualize the algorithm step by step with
            the <span className={"pt-2"}><RewindIcon className={"h-5 w-5"}/></span>/<span className={"pt-2"}><ForwardIcon className={"h-5 w-5"}/></span> buttons,
            or use the <span className={"pt-2"}><PlayIcon className={"h-5 w-5"}/></span>
        </div>
    </div>,
    <>
        Oh! The algorithm is over.
        <br/>
        You can see some Analytics below the final box. Let's see if your prediction was correct.
    </>,
    <>
        Let's check if your prediction was correct:
    </>

]

export default tutorialTexts;
