export default class ExecAction {
    /*
    sock movement or box creation (with sock movement)
     */
    //todo add visual animation
    constructor(category, sockConcerned = undefined, fromCoordinates = "initial box", toCoordinates = "final box") {
        this.category = category
        if (sockConcerned) this.sockConcerned = sockConcerned
        this.fromCoordinates = fromCoordinates
        this.toCoordinates = toCoordinates
    }

    category = 0 //1:movement, 2:box creation, 3:look at, 4:move box //todo update
    socksConcerned = []
    fromCoordinates = [0, 0]
    toCoordinates = [0, 0]


    getLogText = () => {
        if (this.category === 3) {
            return (
                <p className={"flex flex-wrap whitespace-nowrap"}>
                    <span>Sock compared with </span>
                    <span className={"flex"}>
                        {this.sockConcerned.map((sock, i) => sock.getComponent({width: 30, height: 25}, i))}
                    </span>
                    <span>
                        in 
                    </span>
                    <span className={this.fromCoordinates === "initial box" ? "text-green-300" : "text-white"}>
                        {this.fromCoordinates}
                    </span>
                </p>
            )
        }

        return <p className={"flex flex-wrap whitespace-nowrap"}>
            <span>Moved sock </span>
            <span className={"flex"}>
                {this.sockConcerned.map((sock, i) => sock.getComponent({width: 30, height: 25}, i))}
            </span>
            <span>
                from 
            </span>
            <span className={this.fromCoordinates === "initial box" ? "text-green-300" : "text-white"}>
                {this.fromCoordinates}
            </span>
            <span>
                 to 
            </span>
            <span className={this.toCoordinates === "final box" ? "text-red-400" : "text-white"}>
                {this.toCoordinates}
            </span>
        </p>
    }


}
