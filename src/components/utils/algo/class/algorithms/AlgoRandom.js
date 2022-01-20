import Algo from "./Algo";
import Board from "../Board";
import {shuffleBoard} from "../../../utilsFunctions";
import ExecState from "../ExecState";
import ExecAction, {ACTION_COMPARISON, ACTION_MOVE_PAIR} from "../ExecAction";

export default class AlgoRandom extends Algo {
    states = []
    actions = []

    generateStatesAndActions = (socks = []) => {
        this.states = []
        this.actions = []

        let board = new Board([], socks)
        shuffleBoard(board)
        const state = new ExecState(board)
        this.states.push(state)

        let counter = 0
        while (board.initialCollection.length !== 0 && counter < 250) {
            const sock1 = board.initialCollection.splice(Math.floor(Math.random() * board.initialCollection.length), 1)[0]
            const sock2 = board.initialCollection.splice(Math.floor(Math.random() * board.initialCollection.length), 1)[0]

            board[0] = [[sock1, sock2]]

            this.states.push(new ExecState(board))
            this.actions.push(new ExecAction(ACTION_MOVE_PAIR, [sock1, sock2], "initial box", [1, 0]))

            this.states.push(new ExecState(board, [[0, 0]]))
            this.actions.push(new ExecAction(ACTION_COMPARISON, [sock1, sock2], "", "initial box"))
            if(sock1.isSameAs(sock2)) {
                board.finalCollection.push(board[0][0])
                board[0][0] = []
                this.states.push(new ExecState(board))
                this.actions.push(new ExecAction(ACTION_MOVE_PAIR, board.finalCollection[board.finalCollection.length - 1], [1, 0], "final box"))
            } else {
                board.initialCollection.push(board[0][0][0])
                board.initialCollection.push(board[0][0][1])
                board[0][0] = []
                this.states.push(new ExecState(board))
                this.actions.push(new ExecAction(ACTION_MOVE_PAIR, [sock1, sock2], [1, 0], "initial box"))
            }

            counter++
        }


        return [this.states, this.actions]
    }
}
