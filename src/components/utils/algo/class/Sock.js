import SockComponent from "../../../components/SockComponent";

class Sock {
    constructor({
                    color = "#f55648",
                    lineAmount = 3,
                    size = 0,
                    pattern = "dots",
                    patternColor = "black",
                    height = 100,
                    width = 100,
                } =
                    {
                        color: "#f55648",
                        lineAmount: 3,
                        size: 0,
                        pattern: "dots",
                        patternColor: "black",
                        height: 100,
                        width: 100,
                    }) {
        this.param = {
            color: color,
            lineAmount: lineAmount,
            size: size,
            pattern: pattern,
            patternColor: patternColor,
        }
        this.dimensions = {
            height: height,
            width: width,
        }
    }

    getComponent = (props = {}, key = 1) => {
        return <SockComponent {...this.param} {...this.dimensions} {...props} key={key}/>
    }

    isSameAs = (sock) => {
        //need more tests
        return JSON.stringify(this.param) === JSON.stringify(sock.param)
    }

    static orderCollection = (collection = []) => {
        let finalCollection = []
        for (let sock of collection) {
            let isInserted = false
            for (let sockPair of finalCollection) {
                if(sockPair.length < 2 && sockPair[0].isSameAs(sock)) {
                    sockPair.push(sock)
                    isInserted = true
                }
            }
            if(!isInserted) {
                finalCollection.push([sock])
            }
        }

        return finalCollection
    }

}

export default Sock;
