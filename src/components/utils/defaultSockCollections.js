import Sock from "./algo/class/Sock";

export const simpleCollection = {
    title: "Simple",
    socks: [
        new Sock(),
        new Sock(),
        new Sock({color: "blue", lineAmount:2}),
        new Sock({color: "blue", lineAmount:2}),
    ]
}

const defaultSockCollections = [simpleCollection]

export default defaultSockCollections
