import Algo from "./Algo";
import Board from "../Board";
import ExecState from "../ExecState";
import ExecAction, {ACTION_COMPARISON, ACTION_COMPARISON_SIMPLE, ACTION_MOVE, ACTION_MOVE_PAIR} from "../ExecAction";
import {paramDict} from "../Sock";

export default class DivideAndSweepAlgo extends Algo {
    /*
    Maybe:
    then use colors (can have any order for the colors, e.g. alphabetically by color name)
    - split them into piles by color (remember to keep the initial order from step 1 for all socks in the same pile),
        then length of the sock,
        then texture, ....
        until all socks in a group are the same
     */


    states = []
    actions = []

    generateStatesAndActions = (socks = []) => {
        this.states = []
        this.actions = []

        let board = new Board([], socks)
        board.initialCollection.sort((a, b) => 0.5 - Math.random());//shuffle
        const state = new ExecState(board)
        this.states.push(state)

        console.log("at start:", board)
        //divide & sweep

        const divide = (boxIndex, board, step) => {//divide 1 box
            let box = step === 0 ? board.initialCollection : board[step - 1][boxIndex]
            console.log("box", box)
            while (box.length !== 0) {
                const sock = box[box.length - 1]
                let hasFoundBox = false
                for (let i = 0; i < board[step].length; i++) {
                    //simple comparison
                    this.states.push(new ExecState(board, [[step, i], [step === 0 ? -1 : step - 1, box.length - 1]]))
                    this.actions.push(new ExecAction(ACTION_COMPARISON_SIMPLE, [board[step][i][0], sock], "", "", Object.keys(paramDict)[step]))
                    if (board[step][i][0].hasSameFeature(sock, Object.keys(paramDict)[step])) {//same car
                        board[step][i].push(sock)
                        box.pop()
                        this.states.push(new ExecState(board))
                        this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [0, i]))
                        hasFoundBox = true
                        break
                    }
                }
                if (!hasFoundBox) {
                    board[step].push([sock])
                    box.pop()
                    this.states.push(new ExecState(board))
                    this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [0, board[0].length]))
                }
            }

        }

        const sweep = (board, step) => {
            let isAllPaired = true
            board[step].forEach((box, index) => {
                let areAllSame = true
                for (let i = 0; i < box.length - 1; i++) {
                    this.states.push(new ExecState(board, [[step, index]]))
                    this.actions.push(new ExecAction(ACTION_COMPARISON, [box[i], box[i + 1]], "", ""))
                    if (!box[i].isSameAs(box[i + 1])) {
                        areAllSame = false
                        isAllPaired = false
                    }
                }

                if (areAllSame) {
                    while (box.length !== 0) {
                        if (box.length >= 2) {
                            const pair = [box.pop(), box.pop()]
                            console.log("pair:", pair)
                            board.finalCollection.push(pair)
                            this.states.push(new ExecState(board))
                            this.actions.push(new ExecAction(ACTION_MOVE_PAIR, pair, [step, index], "final box"))
                            continue
                        }
                        //if 1 sock
                        const sock = box.pop()
                        console.log("sock:", sock)
                        board.finalCollection.push([sock])
                        this.states.push(new ExecState(board))
                        this.actions.push(new ExecAction(ACTION_MOVE, [sock], [step, index], "final box"))
                    }
                }
            })
            return isAllPaired
        }

        let step = 0
        board.addEmptyRow()
        divide(0, board, step)
        console.log("after divide ", board)
        let isAllPaired = sweep(board, step)
        console.log("after sweep ", board)

        console.log("isAllpaired", isAllPaired)
        let counter = 0;
        while (!isAllPaired && counter <= Object.keys(paramDict).length) {
            step++
            board.addEmptyRow()
            console.log("start", step, board)
            for (let boxIndex = 0; boxIndex < board[step - 1].length; boxIndex++) {
                console.log("divide ", boxIndex, board)
                if (board[step - 1][boxIndex].length !== 0) {
                    console.log("dividing", step, boxIndex)
                    divide(boxIndex, board, step)
                }
            }
            console.log("before sweep", board)
            isAllPaired = sweep(board, step)
            counter++;
        }


        return [this.states, this.actions]
    }

}
