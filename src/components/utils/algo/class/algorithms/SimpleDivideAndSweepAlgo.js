import Algo from "./Algo";
import Board from "../Board";
import ExecState from "../ExecState";
import ExecAction, {ACTION_MOVE, ACTION_MOVE_PAIR} from "../ExecAction";

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
        board.initialCollection.sort((a, b) => 0.5 - Math.random());//shuffle
        const state = new ExecState(board)
        this.states.push(state)
        const nbOfSocks = board.initialCollection.length

        console.log("at start:", board)
        //divide & sweep
        const divide = (board) => {
            board.addEmptyRow()
            while (board.initialCollection.length !== 0) {
                const sock = board.initialCollection.pop()
                let hasFoundBox = false
                for (let i = 0; i < board[0].length; i++) {
                    if (board[0][i][0].isSameAs(sock)) {//todo add in the states and actions
                        board[0][i].push(sock)
                        this.states.push(new ExecState(board))
                        this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [0, i]))
                        hasFoundBox = true
                        break
                    }
                }
                if (!hasFoundBox) {
                    board[0].push([sock])
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
