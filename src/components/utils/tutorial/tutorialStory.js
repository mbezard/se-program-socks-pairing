import {getProgressFromMemory} from "./Progress";
import tutorialTexts from "./tutorialTexts";

export const STEP_ONE_TEXT = "STEP_ONE_TEXT"
export const STEP_MULTIPLE_TEXT = "STEP_MULTIPLE_TEXT"
export const STEP_WAIT = "STEP_WAIT"
export const STEP_NOTHING = "STEP_NOTHING"
export const STEP_QUESTION = "STEP_QUESTION"
export const STEP_PREDICTION = "STEP_PREDICTION"

/*
** Story of the tutorial :
* Présentation de l'interface -
* Lancement de l'éxecution de la collec basique avec l'algo simple -
* Présentation de l'algo -
* Prédiction
* Présentation de l'interface d'éxecution
* Execution
* Critique des résultats et de la prédiction
* Retour au menu avec la grande collection en plus
* Selection de la grande collection et de l'algo simple
* Prediction
* Execution
* Critique des résultats et de la prédiction
* Introduction de l'algo SimpleDivide&Sweep
* Execution sur la grande collection
*
 */


export const tutorialSteps = [
    {type:STEP_MULTIPLE_TEXT, texts: [0,1]},
    {type:STEP_WAIT, time:2500},
    {type:STEP_MULTIPLE_TEXT, texts: [2,3,4]},
    {type:STEP_NOTHING},
    {type:STEP_WAIT, time: 1000},
    {type:STEP_MULTIPLE_TEXT, texts: [6, 7]},
    {type:STEP_QUESTION, text: 5},

]



export function getTutorialStep(progress) {
    if(!progress) {
        progress = getProgressFromMemory()
    }

    let smallStep = 0
    for(let step = 0; step < tutorialSteps.length; step++) {
        switch (tutorialSteps[step].type) {
            case STEP_MULTIPLE_TEXT:
                if (progress < smallStep + tutorialSteps[step].texts.length) {
                    return {type: STEP_MULTIPLE_TEXT, text:tutorialTexts[tutorialSteps[step].texts[progress - smallStep]]}
                }
                smallStep += tutorialSteps[step].texts.length
                break;
            case STEP_ONE_TEXT:
                if (progress === smallStep) {
                    return {type: STEP_ONE_TEXT, text:tutorialTexts[tutorialSteps[step].text]}
                }
                smallStep += 1
                break;
            case STEP_WAIT:
                if (progress === smallStep) return {type: STEP_WAIT, text: null, time:tutorialSteps[step].time || 3000}
                smallStep += 1
                break;
            case STEP_NOTHING:
                if(progress === smallStep) return {type: STEP_NOTHING, text: null}
                smallStep+=1;
                break;
            case STEP_QUESTION:
                if (progress === smallStep) return {type: STEP_QUESTION, text: tutorialTexts[tutorialSteps[step].text]}
                smallStep += 1
                break;
            default:
                return {type: STEP_NOTHING, text: null}
        }

    }


    return {type: STEP_NOTHING, text: null}

}
