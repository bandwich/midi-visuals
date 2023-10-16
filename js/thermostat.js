"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById('thermostatCanvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var drawThermostat = function () {
    ctx.font = "56px serif";
    ctx.textAlign = "center";
    ctx.strokeStyle = "rgba(27, 66, 209, 1)";
    ctx.strokeText("DJ THERMOSTAT", canvas.width / 2, canvas.height / 3.5);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(212, 83, 212, 1)';
    ctx.beginPath();
    ctx.roundRect(canvas.width / 3, canvas.height / 3, 525, 250, 8);
    ctx.stroke();
};
drawThermostat();
