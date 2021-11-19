import React from "react";
import Sock from "../components/Sock";

export default function SocksPairing() {
    return <div className={"h-screen flex content-center bg-greyLight-1"}>
        <div className={"m-auto shadow flex flex-col content-center p-5"}>
            <div>
                <div>Choose socks pool</div>
                <div>
                    <Sock patternColor={"red"} color={"blue"} pattern={"None"} lineAmount={0} height={150} width={150}/>
                    <Sock patternColor={"red"} color={"blue"} pattern={"None"} lineAmount={1} height={150} width={150}/>
                    <Sock patternColor={"red"} color={"blue"} pattern={"None"} lineAmount={2} height={150} width={150}/>
                    <Sock/>
                </div>
            </div>
            <div>Choose Algorithm</div>
        </div>
    </div>
}
