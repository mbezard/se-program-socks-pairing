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
        if (pattern === "None") this.param.patternColor = "black"
        this.dimensions = {
            height: height,
            width: width,
        }
    }

    getComponent = (props = {}, key = 1, dim = this.dimensions) => {
        return <SockComponent {...this.param} {...dim} {...props} key={key}/>
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

export const paramDict = {
    color: ["black", "blue", "red"],
    lineAmount: [0, 1, 2, 3],
    pattern: ["dots", "None"],
    patternColor: ["black", "blue", "red", "orange"],

}


export default Sock;
