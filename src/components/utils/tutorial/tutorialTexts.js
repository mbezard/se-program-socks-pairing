import React from "react";

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
        answers: ["0-1", "2-4", "4-6"]
    },
]

export default tutorialTexts;
