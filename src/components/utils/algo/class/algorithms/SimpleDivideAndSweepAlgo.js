import Algo from "./Algo";
import Board from "../Board";
import ExecState from "../ExecState";
import ExecAction, {ACTION_COMPARISON, ACTION_MOVE, ACTION_MOVE_PAIR} from "../ExecAction";
import {isTutorialActivated} from "../../../tutorial/Progress";
import {shuffleBoard} from "../../../utilsFunctions";

export default class SimpleDivideAndSweepAlgo extends Algo {
    /*
    Maybe:
    then use colors (can have any order for the colors, e.g. alphabetically by color name)
    - split them into piles
     */


    states = []
    actions = []

    generateStatesAndActions = (socks = []) => {
        this.states = []
        this.actions = []

        let board = new Board([], socks)
        shuffleBoard(board)
        const state = new ExecState(board)
        this.states.push(state)

        //divide & sweep
        const divide = (board) => {
            board.addEmptyRow()
            while (board.initialCollection.length !== 0) {
                const sock = board.initialCollection[board.initialCollection.length - 1]
                let hasFoundBox = false
                for (let i = 0; i < board[0].length; i++) {
                    this.states.push(new ExecState(board, [[0,i], [-1, board.initialCollection.length - 1]]))
                    this.actions.push(new ExecAction(ACTION_COMPARISON, [sock, board[0][i][0]], "", ""))
                    if (board[0][i][0].isSameAs(sock)) {
                        board[0][i].push(sock)
                        board.initialCollection.pop()
                        this.states.push(new ExecState(board))
                        this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [0, i]))


                        board.finalCollection.push(board[0][i])
                        board[0].splice(i, 1)
                        this.states.push(new ExecState(board))
                        this.actions.push(new ExecAction(ACTION_MOVE_PAIR, board.finalCollection[board.finalCollection.length - 1], [0, i], "final box"))

                        hasFoundBox = true
                        break
                    }
                }
                if (!hasFoundBox) {
                    board[0].push([sock])
                    board.initialCollection.pop()
                    this.states.push(new ExecState(board))
                    this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [0, board[0].length-1]))
                }

            }

        }

        const sweep = (board) => {
            board[0].forEach((box, index) => {
                while (box.length !== 0) {
                    if(box.length >= 2) {
                        const pair = [box.pop(), box.pop()]
                        console.log("pair:",pair)
                        board.finalCollection.push(pair)
                        this.states.push(new ExecState(board))
                        this.actions.push(new ExecAction(ACTION_MOVE_PAIR, pair, [0,index], "final box"))
                        continue
                    }
                    //if 1 sock
                    const sock = box.pop()
                    console.log("sock:",sock)
                    board.finalCollection.push([sock])
                    this.states.push(new ExecState(board))
                    this.actions.push(new ExecAction(ACTION_MOVE_PAIR, [sock], [0,index], "final box"))
                }
            })
        }


        divide(board)
        sweep(board)



        return [this.states, this.actions]
    }

}
