import {combineReducers, createStore} from "redux";
import SockCollectionReducer from "./SockCollection/SockCollectionReducer";

export default createStore(combineReducers({
        sockCollection: SockCollectionReducer
    }),
)
