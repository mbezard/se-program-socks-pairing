import {combineReducers, createStore} from "redux";
import SockCollectionReducer from "./SockCollection/SockCollectionReducer";

export default createStore(combineReducers({
        sockCollection: SockCollectionReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
