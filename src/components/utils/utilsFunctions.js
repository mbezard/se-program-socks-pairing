import {getProgressFromMemory, isTutorialActivated} from "./tutorial/Progress";

export function toStandardCase(s = "") {
    s = s.toString()
    const result = s.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1)
}

export function shuffleBoard(board) {
    if (isTutorialActivated()) {
        if(board.initialCollection.length === 4 && getProgressFromMemory() < 20) {
            board.initialCollection = [
                board.initialCollection[0],
                board.initialCollection[2],
                board.initialCollection[1],
                board.initialCollection[3],
            ]
        } else if (board.initialCollection.length === 8 && getProgressFromMemory() < 35){
            board.initialCollection = [
                board.initialCollection[0], board.initialCollection[3],
                board.initialCollection[2], board.initialCollection[6],
                board.initialCollection[1], board.initialCollection[5],
                board.initialCollection[4], board.initialCollection[7],
            ]
        }

    } else {
        board.initialCollection.sort((a, b) => 0.5 - Math.random());//shuffle
    }
}
