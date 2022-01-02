import {useParams} from "react-router-dom";
import SimpleAlgo from "../utils/algo/class/algorithms/SimpleAlgo"
import {getSelectedCollection} from "../utils/collectionSelection";

export default function SockPairingAlgorithm() {
    const params = useParams()
    const algoUsed = params?.algo
    let algo = null
    let collection = getSelectedCollection()
    // console.log(collection)

    if(parseInt(algoUsed) === 0) {
        algo = new SimpleAlgo()
    }

    algo?.generateStatesAndActions(collection)

    console.log("states: ", algo?.states)
    console.log("actions: ", algo?.actions)

    return (<><div>
        Algo n°{algoUsed}
    </div></>)
}
