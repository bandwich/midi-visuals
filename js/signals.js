"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById('signalsCanvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var yPosition = 40;
window.ada.draw(function (_event, value) {
    initializeView();
});
window.ada.action(function (_event, value) {
    ctx.font = '20px serif';
    ctx.strokeText(actionString(value.label, value.message), canvas.width / 2 - 75, yPosition);
    if (yPosition >= canvas.height - 40) {
        yPosition = 40;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    else
        yPosition += 50;
});
var initializeView = function () {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
var actionString = function (label, action) {
    var actions = action.reduce(function (acc, curr) { return acc + ' ' + curr.toString(); }, '');
    return label + ' ' + actions;
};
