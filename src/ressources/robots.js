import Robot1 from "./robot-1.png"
import Robot2 from "./robot-2.png"
import Robot3 from "./robot-3.png"

const robots = [Robot1, Robot2, Robot3]
export default robots;

export const robotColors = ["yellow", "green", "blue"]

export const robotNames = ["yellow", "green", "blue"]

export const robotDescription = ["Simple, human algorithm", "Simple Divide & Sweep", "Dive & Sweep"]

export const robotAlgorithm = [
    <>
        1 Repeat until there is no more sock in the pile:
        <br/>2    Pick a sock from the pile
        <br/>3    Find its match in the pile
        <br/>4    Put it aside
    </>,
    <>
        1 Pick a sock and put it in a box
        <br/>2 Repeat for all other socks:
        <br/>3    Pick a sock
        <br/>4    If it match a sock in one of the box:
        <br/>5        Match it and put it in the final pile
    </>,
    <>
        1 Repeat for each criteria (color, pattern, ...):
        <br/>2    Divide all socks by criteria into boxes
        <br/>3    If all socks in a box are identical:
        <br/>4        Make pairs from that box to the final pile:
        <br/>5    If all boxes are empty:
        <br/>6        Stop the algorithm:
    </>]


