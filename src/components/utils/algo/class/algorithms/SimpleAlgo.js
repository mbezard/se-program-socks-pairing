import ExecState from "../ExecState";
import ExecAction, {ACTION_COMPARISON, ACTION_MOVE, ACTION_MOVE_PAIR} from "../ExecAction";
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
        board.initialCollection.sort((a, b) => 0.5 - Math.random());//shuffle
        const state = new ExecState(board)
        this.states.push(state)

        console.log("at start:",board)
        while (board.initialCollection.length !== 0) {
            const sock = board.initialCollection.pop() //we pop a sock from initial collection
            board[0] = [[sock]]
            this.states.push(new ExecState(board))
            this.actions.push(new ExecAction(ACTION_MOVE, [sock], "initial box", [1,0]))

            for (let i=0; i<board.initialCollection.length;i++) {//we look for a match inside initial collection
                let sock2 = board.initialCollection[i]
                this.states.push(new ExecState(board))
                this.actions.push(new ExecAction(ACTION_COMPARISON, [sock, sock2], "", "initial box"))
                if(sock2.isSameAs(sock)) {
                    board.initialCollection.splice(i, 1)
                    board[0][0] = [sock, sock2]
                    this.states.push(new ExecState(board))
                    this.actions.push(new ExecAction(ACTION_MOVE, [sock2], "initial box", [1,0]))
                    break;
                }
            }

            board.finalCollection.push(board[0][0])
            board[0][0] = []
            this.states.push(new ExecState(board))
            this.actions.push(new ExecAction(ACTION_MOVE_PAIR, board.finalCollection[board.finalCollection.length - 1], [1,0], "final box"))
        }
        console.log("at the end:",board)
        return [this.states, this.actions]
    }

}
