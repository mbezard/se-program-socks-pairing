export default class ExecAction {
    /*
    sock movement or box creation (with sock movement)
     */

    constructor(category, sockConcerned = {}, fromCoordinates = [0, 0], toCoordinates = [0, 0]) {
        this.category = category
        this.sockConcerned = sockConcerned
        this.fromCoordinates = fromCoordinates
        this.toCoordinates = toCoordinates
    }

    category = 0 //1:movement, 2:box creation, 3:look at, 4:move box
    socksConcerned = []
    fromCoordinates = [0, 0]
    toCoordinates = [0, 0]

    getLogText = () => {
        const dim = {
            height: 5,
            width: 5
        }

        return <div>
            <p>Moved sock </p>
            {this.sockConcerned.map(sock => sock.getComponent({}, 1, dim))}
            <p> from {this.fromCoordinates} to {this.toCoordinates}</p>

        </div>
    }

    applyTo = (state) => {
        //todo
    }

}
