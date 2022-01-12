import Sock from "./algo/class/Sock";

export const simpleCollection = {
    title: "Simple",
    socks: [
        new Sock(),
        new Sock(),
        new Sock({color: "blue"}),
        new Sock({color: "blue"}),
    ]
}

export const bigCollection = {
    title: "Big",
    socks: [
        new Sock({color: "red"}),
        new Sock({color: "red"}),
        new Sock({color: "blue"}),
        new Sock({color: "blue"}),
        new Sock({color: "green"}),
        new Sock({color: "green"}),
        new Sock({color: "orange"}),
        new Sock({color: "orange"}),
    ]
}

const defaultSockCollections = [simpleCollection, bigCollection]

export default defaultSockCollections
