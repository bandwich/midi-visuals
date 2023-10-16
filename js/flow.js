"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById('flowCanvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
var CELL_SIZE = 20;
var CURVE = 5;
var ZOOM = 0.1;
var ROWS = Math.floor(canvas.height / CELL_SIZE);
var COLS = Math.floor(canvas.width / CELL_SIZE);
var flowParticles = [];
var flowField = [];
var colors = [
    [252, 186, 3],
    [212, 129, 4],
    [230, 104, 21],
    [230, 70, 21],
    [237, 61, 7],
    [237, 38, 7],
    [237, 134, 7]
];
var initializeFlow = function (numParticles) {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    for (var y = 0; y < ROWS; y++) {
        for (var x = 0; x < COLS; x++) {
            var angle = (Math.cos(x * ZOOM) + Math.sin(y * ZOOM)) * CURVE;
            flowField.push(angle);
        }
    }
    for (var i = 0; i < numParticles; i++) {
        flowParticles.push(newFlowParticle(canvas.width, canvas.height));
    }
};
var colorString = function (color) {
    return 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ',1)';
};
var updateColor = function (flowParticle) {
    var nextIndex = flowParticle.nextColorIndex;
    // for r, g, and b of the current color
    for (var i = 0; i < 3; i++) {
        // find the difference between the next and current color
        var difference = colors[nextIndex][i] - flowParticle.color[i];
        // if the colors are the same, mark it
        if (difference === 0) {
            // if necessary, check if the full color matches and pick next color if so
            if (!flowParticle.colorReached[i]) {
                flowParticle.colorReached[i] = true;
                // check if all pixels have reached the next color
                // if so, (or on initialization), pick the next color and set pixel states to false
                var allPixelsDone = flowParticle.colorReached.reduce(function (acc, curr) { return acc && curr; }, true);
                if (allPixelsDone) {
                    flowParticle.nextColorIndex = Math.floor(Math.random() * colors.length);
                    flowParticle.colorReached = [false, false, false];
                }
            }
            // no need to increment
            continue;
        }
        // if they're not the same, increment the primary color towards its pair in the next color
        difference > 0
            ? flowParticle.color[i] += 2
            : flowParticle.color[i] += 2;
    }
};
var newFlowParticle = function (width, height) {
    var x = Math.floor(Math.random() * width);
    var y = Math.floor(Math.random() * height);
    var maxLength = Math.floor(Math.random() * 200 + 10);
    return {
        x: x,
        y: y,
        speedX: 0,
        speedY: 0,
        speedModifier: Math.floor(Math.random() * 3 + 1),
        angle: 0,
        history: [{ x: x, y: y }],
        maxLength: maxLength,
        timer: maxLength * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        nextColorIndex: 4,
        colorReached: [false, false, false]
    };
};
var drawFlowParticle = function (flowParticle) {
    ctx.beginPath();
    ctx.moveTo(flowParticle.history[0].x, flowParticle.history[0].y);
    for (var _i = 0, _a = flowParticle.history; _i < _a.length; _i++) {
        var h = _a[_i];
        ctx.lineTo(h.x, h.y);
    }
    ctx.strokeStyle = colorString(flowParticle.color);
    ctx.stroke();
};
var updateFlowParticle = function (flowParticle) {
    flowParticle.timer--;
    if (flowParticle.timer >= 1) {
        var x = Math.floor(flowParticle.x / CELL_SIZE);
        var y = Math.floor(flowParticle.y / CELL_SIZE);
        var index = y * COLS + x;
        flowParticle.angle = flowField[index];
        flowParticle.speedX = Math.cos(flowParticle.angle);
        flowParticle.speedY = Math.sin(flowParticle.angle);
        flowParticle.x += flowParticle.speedX * flowParticle.speedModifier;
        flowParticle.y += flowParticle.speedY * flowParticle.speedModifier;
        flowParticle.history.push({ x: flowParticle.x, y: flowParticle.y });
        if (flowParticle.history.length > flowParticle.maxLength) {
            flowParticle.history.shift();
        }
    }
    else if (flowParticle.history.length > 1) {
        flowParticle.history.shift();
    }
    else {
        flowParticle.x = Math.floor(Math.random() * canvas.width);
        flowParticle.y = Math.floor(Math.random() * canvas.height);
        flowParticle.history = [{ x: flowParticle.x, y: flowParticle.y }];
        flowParticle.timer = flowParticle.maxLength * 2;
    }
};
var drawFlow = function () {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var _i = 0, flowParticles_1 = flowParticles; _i < flowParticles_1.length; _i++) {
        var particle = flowParticles_1[_i];
        drawFlowParticle(particle);
        updateFlowParticle(particle);
    }
    requestAnimationFrame(drawFlow);
};
setInterval(function () {
    for (var _i = 0, flowParticles_2 = flowParticles; _i < flowParticles_2.length; _i++) {
        var particle = flowParticles_2[_i];
        updateColor(particle);
        particle.color = colors[particle.nextColorIndex];
    }
}, 100);
initializeFlow(500);
drawFlow();
