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

export const mediumCollection = {
    title: "Medium",
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

export const bigollection = {
    title: "Big",
    socks: [
        new Sock({color: "yellow", pattern:"None"}),
        new Sock({color: "yellow", pattern:"None"}),
        new Sock({color: "yellow", pattern:"heart", patternColor:"magenta"}),
        new Sock({color: "yellow", pattern:"heart", patternColor:"magenta"}),
        new Sock({color: "blue", patternColor: "orange", lineAmount:0}),
        new Sock({color: "blue", patternColor: "orange", lineAmount:0}),
        new Sock({color: "blue"}),
        new Sock({color: "blue"}),
        new Sock({color: "green", lineAmount:1, pattern: "heart", patternColor:"green"}),
        new Sock({color: "green", lineAmount:1, pattern: "heart", patternColor:"green"}),
        new Sock({color: "green"}),
        new Sock({color: "green"}),
        new Sock({color: "orange"}),
        new Sock({color: "orange"}),
        new Sock({color: "orange", lineAmount:0, pattern:"None"}),
        new Sock({color: "orange", lineAmount:0, pattern:"None"}),
        new Sock({color: "darkgrey", lineAmount:3, pattern:"heart"}),
        new Sock({color: "darkgrey", lineAmount:3, pattern:"heart"}),
        new Sock({color: "darkgrey", lineAmount:0, pattern:"heart"}),
        new Sock({color: "darkgrey", lineAmount:0, pattern:"heart"}),
    ]
}

const defaultSockCollections = [simpleCollection, mediumCollection, bigollection]

export default defaultSockCollections
