import Sock from "./algo/class/Sock";

export const setSelectedCollection = (collection) => {
    localStorage.setItem("selectedCollection", JSON.stringify(collection))
}

export const getSelectedCollection = () => {
    const collectionAsJson = JSON.parse(localStorage.selectedCollection)
    if(collectionAsJson == null) return []
    return collectionAsJson.map(sock => {
        // console.log(sock, new Sock({...sock?.param, ...sock?.dimension}))
        return new Sock({...sock?.param, ...sock?.dimension})
    })

}
