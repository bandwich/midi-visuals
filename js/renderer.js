var startAda = document.getElementById('start-ada');
var startRecord = document.getElementById('record-ada');
var startReplay = document.getElementById('replay-ada');
var displayMessage = document.getElementById('message-to-display');
var recording = false;
startAda.onclick = function (ev) {
    window.ada.startListener();
    startAda.style.display = 'none';
};
startReplay.onclick = function (ev) {
    window.ada.replay();
};
startRecord.onclick = function (ev) {
    var recordImage = recording
        ? "url('public/images/record.png')"
        : "url('public/images/stop.png')";
    startRecord.style.backgroundImage = recordImage;
    recording = !recording;
    window.ada.record();
};
window.ada.ports(function (_event, value) {
    displayMessage.innerText = 'Connected to ' + value.input;
});
