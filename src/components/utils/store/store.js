import {combineReducers, createStore} from "redux";
import SockCollectionReducer from "./SockCollection/SockCollectionReducer";
import {setSockCollection} from "./SockCollection/SockCollectionActions";
import Sock from "../algo/class/Sock";

const store = createStore(combineReducers({
        sockCollection: SockCollectionReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

if (localStorage.sockCollection) {
    // console.log("loading socks from local storage")
    const collectionAsJson = JSON.parse(localStorage.sockCollection)
    const collection = collectionAsJson.map(sock => {
        // console.log(sock, new Sock({...sock?.param, ...sock?.dimension}))
        return new Sock({...sock?.param, ...sock?.dimension})
    })
    store.dispatch(setSockCollection(collection))
} else {//to be removed
    // console.log("populate socks")
    const s1 = new Sock()
    const s2 = new Sock()
    const s3 = new Sock({color: "blue"})
    const s4 = new Sock({color: "blue"})
    const s5 = new Sock()

    store.dispatch(setSockCollection([s1, s2, s3, s4, s5]))
}

export default store
