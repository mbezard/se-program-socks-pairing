export function getProgress() {//todo use a reducer
    return localStorage.getItem("progress") || 0
}

export function setProgress(progress) {
    localStorage.setItem("progress", progress)
}
