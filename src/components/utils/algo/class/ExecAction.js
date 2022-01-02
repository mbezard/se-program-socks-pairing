export default class ExecAction {
    /*
    sock movement or box creation (with sock movement)
     */

    constructor(category, sockConcerned = undefined, fromCoordinates = [0, 0], toCoordinates = [0, 0]) {
        this.category = category
        if(sockConcerned) this.sockConcerned = sockConcerned
        this.fromCoordinates = fromCoordinates
        this.toCoordinates = toCoordinates
    }

    category = 0 //1:movement, 2:box creation, 3:look at, 4:move box
    socksConcerned = []
    fromCoordinates = [0, 0]
    toCoordinates = [0, 0]


    getLogText = () => {
        // console.log("logging :", this.sockConcerned)
        return <p className={"flex flex-nowrap"}>
            <span>Moved sock </span>
            {this.sockConcerned.map((sock,i) => sock.getComponent({width: 30, height:25}, i))}
            <span> from {this.fromCoordinates} to {this.toCoordinates}</span>

        </p>
    }

    applyTo = (state) => {
        //todo
    }

}
