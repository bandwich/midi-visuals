let startAda: HTMLElement = document.getElementById('start-ada')
let startRecord: HTMLElement = document.getElementById('record-ada')
let startReplay: HTMLElement = document.getElementById('replay-ada')

let displayMessage = document.getElementById('message-to-display')

let recording = false

startAda.onclick = (ev) => {
    window.ada.startListener()
    startAda.style.display = 'none'
}

startReplay.onclick = (ev) => {
    window.ada.replay()
}

startRecord.onclick = (ev) => {
    const recordImage = recording
        ? "url('public/images/record.png')"
        : "url('public/images/stop.png')"
    startRecord.style.backgroundImage = recordImage
    recording = !recording

    window.ada.record()
}

window.ada.ports((_event, value) => {
    displayMessage.innerText = 'Connected to ' + value.input
})