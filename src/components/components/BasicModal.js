import {useEffect, useState} from "react";

export default function BasicModal({
                                       isShownByDefault = false,
                                       onExit = () => {
                                       },
                                       ...props
                                   }) {

    const [isShown, setIsShown] = useState(isShownByDefault)
    useEffect(() => {
        setIsShown(isShownByDefault)
    }, [isShownByDefault, props])

    const onClose = () => {
        setIsShown(false)
        onExit()
    }


    return (<div>
        {isShown && <div className={"overflow-hidden fixed max-h-full max-w-full z-40 inset-0"}
                         style={{backdropFilter: "blur(4px)"}}>

            <div className={"absolute top-1/2 left-1/2 z-50"} style={{transform: "translate(-50%, -50%)"}}>
                {/*<div className={"relative z-50 bg-white min-h-5 min-w-15 rounded p-5"}>*/}
                <div>
                    {props.children}
                </div>

                {/*</div>*/}
            </div>


            <div onClick={onClose} className="opacity-25 fixed inset-0 z-40 bg-black"/>

        </div>}
    </div>)
}
