export default class Board extends Array{
    constructor(board = [], initialCollection = []) {
        super();
        this.finalCollection = []
        if (board != null && board.length !== 0) {
            for (let i =0; i<board.length; i++) {
                this[i] = board[i]
            }
            this.finalCollection = board.finalCollection
            this.initialCollection = board.initialCollection
        } else if(initialCollection.length !== 0) {
            this.initialCollection = initialCollection
        }
    }

    initialCollection = [] //list of socks
    finalCollection = [] //list of pairs

    addEmptyRow = () => {
        this.push([])
    }
}
