export const SET_SOCK_COLLECTION = "SET_SOCK_COLLECTION"
export const ADD_SOCK_TO_COLLECTION = "ADD_SOCK_TO_COLLECTION"

export const setSockCollection = (collection) =>  {
    localStorage.setItem("sockCollection", JSON.stringify(collection))
    return {type:SET_SOCK_COLLECTION, payload:collection}
}

export const addSock = (sock) =>  {
    return {type:ADD_SOCK_TO_COLLECTION, payload:sock}
}
