import {ADD_SOCK_TO_COLLECTION, SET_SOCK_COLLECTION} from "./SockCollectionActions";

export default function sockCollectionReducer(state = [], action) {
    switch (action.type) {
        case SET_SOCK_COLLECTION:
            return action.payload
        case ADD_SOCK_TO_COLLECTION:
            return [...state, action.payload]
        default:
            return state
    }
}
