import {useParams} from "react-router-dom";

export default function SockPairingAlgorithm() {
    const params = useParams()
    const algoUsed = params?.algo

    return (<><div>
        Algo{JSON.stringify(params)}
    </div></>)
}
