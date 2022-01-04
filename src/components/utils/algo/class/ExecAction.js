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

    category = ""
    socksConcerned = []
    fromCoordinates = [0, 0]
    toCoordinates = [0, 0]


    getLogText = () => {
        if (this.category === ACTION_COMPARISON) {
            return (
                <p className={"flex flex-wrap whitespace-nowrap"}>
                    <span>Sock </span>
                    {this.sockConcerned.length > 0 &&
                    <>
                        <span className={"flex"}>
                            {this.sockConcerned[0].getComponent({width: 30, height: 25})}
                        </span>
                        {
                            this.fromCoordinates && <>
                                <span>(in </span>
                                <span
                                    className={this.fromCoordinates === "initial box" ? "text-green-300" : "text-white"}>{this.fromCoordinates}</span>
                                <span>) </span>
                            </>
                        }
                    </>
                    }
                    <span>compared</span>
                    {
                        this.sockConcerned.length > 1 &&
                        <>
                            <span> with</span>
                            <span className={"flex"}>
                                {this.sockConcerned[1].getComponent({width: 30, height: 25})}
                            </span>
                            {
                                this.toCoordinates && <>
                                    <span>(in </span>
                                    <span
                                        className={this.fromCoordinates === "initial box" ? "text-red-400" : "text-white"}>{this.toCoordinates}</span>
                                    <span>)</span>
                                </>
                            }
                        </>
                    }
                </p>
            )
        }

        return <p className={"flex flex-wrap whitespace-nowrap"}>
            {
                this.category === ACTION_MOVE ?
                    <span>Moved sock </span>
                    :
                    <span>Moved pair </span>
            }
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

export const ACTION_MOVE = "ACTION_MOVE"
export const ACTION_COMPARISON = "ACTION_COMPARISON"
export const ACTION_MOVE_PAIR = "ACTION_MOVE_PAIR"
