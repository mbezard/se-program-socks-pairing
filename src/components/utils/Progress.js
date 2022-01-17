export function getProgressFromMemory() {//todo use a reducer
    return localStorage.getItem("progress") || 0
}

export function setProgressInMemory(progress) {
    localStorage.setItem("progress", progress)
}

export function activateTutorial() {
    localStorage.setItem("isTutorialActivated", "1")
}

export function deactivateTutorial() {
    localStorage.setItem("isTutorialActivated", "0")
}

export function isTutorialActivated() {
    return  localStorage.getItem("isTutorialActivated") === "1"
}
