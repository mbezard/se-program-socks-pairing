class SimpleAlgo {
    /*
    We take 1 sock from the pile from the pile and look for its match,
    then put it in the final pile.
     */
    constructor() {
    }

    states = []
    actions = []

    generateStatesAndActions = (socks = []) => {
        let board = [[socks], [], []]
        const state = new ExecState(board)
        this.states.push(state)

        while (board[0].length !== 0) {
            const sock = board[0].pop()
            board = [...board[0], [sock], board[2]]
            this.states.push(new ExecState(board))
            this.actions.push(new ExecAction(1, [sock], [0,0], [1,0]))

            for (let i=0; i<board[0].length;i++) {
                this.actions.push(new ExecAction(3, [board[0][i]], [0,0], [0,0]))
                if(board[0][i].isSameAs(sock)) {
                    board[0].splice(i, 1)
                    board = [...board[0], [sock, board[0][i]], ...board[2]]
                    this.states.push(new ExecState(board))
                    this.actions.push(new ExecAction(1, [board[0][i]], [0,0], [1,0]))
                    break;
                }
            }

            board[2].push(board[1])
            board[1] = []

            this.states.push(new ExecState(board))
            this.actions.push(new ExecAction(1, [board[2]["length"]], [1,0], [2,0]))
        }
    }

}
