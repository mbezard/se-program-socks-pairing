import Sock from "./Sock";
import Board from "./Board";

export default class ExecState {
    constructor(board = null) {
        if (board != null) {
            // console.log("state receiving board (after parse)", JSON.parse(JSON.stringify(board.finalCollection)))

            //copying initial collection
            this.board.initialCollection = JSON.parse(JSON.stringify(board.initialCollection)).map(sock =>
                new Sock({...sock?.param, ...sock?.dimension})
            )
            //copying final collection
            this.board.finalCollection = JSON.parse(JSON.stringify(board.finalCollection)).map(pair => {
                    // console.log(pair)
                    return pair.map(sock => new Sock({...sock?.param, ...sock?.dimension}))
                }
            )

            //copying board
            for (let i = 0; i < board.length; i++) {
                let row = board[i]

                if (row == null || row?.length === 0) this.board[i] = row //if row null or empty
                else if (row[0] instanceof Sock) {//if row is list of socks
                    this.board[i] = JSON.parse(JSON.stringify(board)).map(sock =>
                        new Sock({...sock?.param, ...sock?.dimension})
                    )
                } else if (row[0] instanceof Array) {//if row is list of boxes
                    this.board[i] = row.map(box => JSON.parse(JSON.stringify(box)).map(sock =>
                        new Sock({...sock?.param, ...sock?.dimension})
                    ))
                }
            }

            // console.log("state computing board", this.board)
            // console.log("-")
        }
    }

    board = new Board()

    getNumberOfRows = () => this.board.length
    getNumberOfColumns = () => Math.max(this.board.map(row => row.length))

    //todo trop de boites depasse de l'ecran
    getHtml = () => {//todo print l'étape de l'algo (si y en a une)
        return (
            <div className={"flex flex-col"}>
                <div className={"w-full h-24 mb-6"}>
                    <div className={"border-8 border-yellow-900 bg-yellow-700 h-full mx-5 flex"}>
                        {this.board.initialCollection.map((sock, i) => sock.getComponent({height: 50, width: 50}, i))}
                    </div>
                </div>
                <div>
                    {this.board.map((row, i) => (
                        <div className={"flex justify-center flex-wrap border-t-2 border-b-2 border-black mx-8 py-2"} key={i}>
                            {row.map((boxOrSocks, j) => (
                                <div key={j}
                                     className={"flex inline-flex justify-center border-4 border-gray-700 bg-gray-400 whitespace-nowrap mb-3 mx-5"}
                                     style={{minWidth: "8rem", minHeight: "6rem"}}>
                                    {
                                        (boxOrSocks.length !== 0 && (boxOrSocks[0] instanceof Sock)) ?
                                            boxOrSocks.map((sock, k) => sock.getComponent({width: 50, height: 50}, k))
                                            :
                                            "empty"
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className={"w-full h-24 mt-6"}>
                    <div className={"border-8 border-yellow-900 bg-yellow-700 h-full mx-5 flex"}>
                        {this.board.finalCollection.map((pair, i) => (
                            <div key={i} className={"inline-flex"} style={{minWidth: "4rem"}}>
                                <div>
                                    {pair[0] && pair[0].getComponent({height: 50, width: 50})}
                                </div>
                                {pair[1] &&
                                <div className={"relative"} style={{
                                    marginLeft: "-" + (50 / 2) + "px"
                                }}>
                                    {pair[1].getComponent({height: 50, width: 50})}
                                </div>}
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        )
    }

}
