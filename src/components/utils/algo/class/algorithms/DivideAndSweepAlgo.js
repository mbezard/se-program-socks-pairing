import Algo from "./Algo";
import Board from "../Board";
import ExecState from "../ExecState";
import ExecAction, {ACTION_COMPARISON, ACTION_MOVE, ACTION_MOVE_PAIR} from "../ExecAction";

export default class SimpleDivideAndSweepAlgo extends Algo {//todo
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
        const nbOfSocks = board.initialCollection.length

        console.log("at start:", board)
        //divide & sweep

        const divide = (boxIndex, board, step) => {
            board.addEmptyRow()
            while (board[step][boxIndex].length !== 0) {
                const sock = board[step][boxIndex].pop()
                let hasFoundBox = false
                for (let i = 0; i < board[step + 1].length; i++) {
                    if (board[step + 1][i][0].isSameAs(sock)) {//same car
                        board[step + 1][i].push(sock)
                        this.states.push(new ExecState(board))
                        this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [0, i]))
                        hasFoundBox = true
                        break
                    }
                }
                if (!hasFoundBox) {
                    board[0].push([sock])
                    this.states.push(new ExecState(board))
                    this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [0, board[0].length]))
                }
            }

        }

        const sweep = (board, step) => {
            board[step].forEach((box, index) => {
                let areAllSame = true
                for (let i = 0; i < box.length - 1; i++) {
                    this.states.push(new ExecState(board))
                    this.states.push(new ExecAction(ACTION_COMPARISON, [box[i], box[i + 1]],"", ""))
                    if (!box[i].isSameAs(box[i + 1])) {
                        areAllSame = false
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
        }


        divide(board)
        sweep(board)


        return [this.states, this.actions]
    }

}
