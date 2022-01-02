import ExecState from "../ExecState";
import ExecAction from "../ExecAction";
import Algo from "./Algo";
import Board from "../Board";

export default class SimpleAlgo extends Algo{
    /*
    We take 1 sock from the pile from the pile and look for its match,
    then put it in the final pile.
     */
    constructor() {
        super();
    }

    states = []
    actions = []

    generateStatesAndActions = (socks = []) => {
        // console.log(socks)
        this.states = []
        this.actions = []

        let board = new Board([], socks)
        const state = new ExecState(board)
        this.states.push(state)

        console.log("at start:",board)
        while (board.initialCollection.length !== 0) {
            const sock = board.initialCollection.pop()
            board[0] = [sock]
            this.states.push(new ExecState(board))
            this.actions.push(new ExecAction(1, [sock], [0,0], [1,0]))

            for (let i=0; i<board.initialCollection.length;i++) {
                let sock2 = board.initialCollection[i]
                //todo add state
                this.actions.push(new ExecAction(3, [sock2], [0,0], [0,0]))
                if(sock2.isSameAs(sock)) {
                    board.initialCollection.splice(i, 1)
                    board[0] = [sock, sock2]
                    this.states.push(new ExecState(board))
                    this.actions.push(new ExecAction(4, [sock2], [0,0], [1,0]))
                    break;
                }
            }

            board.finalCollection.push(board[0])
            board[0] = []
            this.states.push(new ExecState(board))
            this.actions.push(new ExecAction(1, board.finalCollection[board.finalCollection.length - 1], [1,0], [2,0]))
        }
        console.log("at the end:",board)
    }

}
