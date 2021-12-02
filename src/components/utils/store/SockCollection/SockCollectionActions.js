export const SET_SOCK_COLLECTION = "SET_SOCK_COLLECTION"
export const ADD_SOCK_TO_COLLECTION = "ADD_SOCK_TO_COLLECTION"

export const setSockCollection = (collection) =>  {
    return dispatch => dispatch({type:SET_SOCK_COLLECTION, payload:collection})
}

export const addSock = (sock) =>  {
    return dispatch => dispatch({type:ADD_SOCK_TO_COLLECTION, payload:sock})
}
