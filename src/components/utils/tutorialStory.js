import React from "react";

const story = [
    <>
        Hi! My name is WiseBot
        <br/>
        Bip! Boop!
        <br/>
        Welcome to the Tutorial
    </>,
    <>
        Next step
    </>
]

export function getText(progress) {
    if(!progress) progress = 0
    return story[progress]

}
