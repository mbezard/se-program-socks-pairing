class ExecState{
    constructor(board = null) {
        if (board!=null) {
            this.board = JSON.parse(JSON.stringify(board)) //copy
        }
    }

    board = []
    init = (socks) => {this.board = [[socks]]}
    getNumberOfRows = () => this.board.length
    getNumberOfColumns = () => Math.max(this.board.map(row => row.length))

    getHtml = () => {
        //todo (or show func)
    }

}
