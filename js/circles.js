"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById('circlesCanvas');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.ada.draw(function (_event, value) {
    initializeCircles(75);
    animateCircles();
});
window.ada.action(function (_event, value) {
    var actionValue = value.message[2];
    switch (value.label) {
        case 'beat':
            reduceOpacity();
            changeBackgroundColor();
            break;
        case 'EQHigh':
            setRedValue(remap(actionValue, 0, 127, 0, 255));
            break;
        case 'EQMid':
            setGreenValue(remap(actionValue, 0, 127, 0, 255));
            break;
        case 'EQLow':
            setBlueValue(remap(actionValue, 0, 127, 0, 255));
            break;
    }
});
var CIRCLE_RADIUS = 20;
var circles = [];
var newColorStyle = function (red, green, blue, opacity) {
    return {
        red: red,
        green: green,
        blue: blue,
        opacity: opacity
    };
};
var circleStyles = newColorStyle(255, 255, 255, 1);
var backgroundStyles = [
    newColorStyle(15, 48, 59, 0.3),
    newColorStyle(77, 19, 50, 0.3),
    newColorStyle(21, 38, 5, 0.3),
    newColorStyle(43, 49, 59, 0.3),
    newColorStyle(46, 21, 4, 0.3),
    newColorStyle(24, 13, 36, 0.3)
];
var backgroundColorCounter = 0;
var reduceOpacityTimer;
var increaseOpacityTimer;
var mod = function (n, m) {
    return ((n % m) + m) % m;
};
var randFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var randVelocity = function () { return Math.ceil(Math.random() * 3); };
var newCircle = function () {
    return {
        radius: CIRCLE_RADIUS,
        x: randFromInterval(CIRCLE_RADIUS, canvas.width - CIRCLE_RADIUS),
        y: randFromInterval(CIRCLE_RADIUS, canvas.height - CIRCLE_RADIUS),
        xVel: randVelocity(),
        yVel: randVelocity(),
    };
};
var colorString = function (styles) {
    return 'rgba(' + styles.red + ', ' + styles.green + ', ' + styles.blue + ', ' + styles.opacity + ')';
};
var drawCircle = function (circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = colorString(circleStyles);
    ctx.stroke();
    ctx.closePath();
};
var moveCircle = function (circle) {
    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
        circle.xVel = -circle.xVel;
    }
    if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
        circle.yVel = -circle.yVel;
    }
    circle.x += circle.xVel;
    circle.y += circle.yVel;
};
var initializeCircles = function (numCircles) {
    for (var i = 0; i < numCircles; i++) {
        circles.push(newCircle());
    }
};
var animateCircles = function () {
    var counter = backgroundColorCounter;
    ctx.fillStyle = colorString(backgroundStyles[counter]);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var _i = 0, circles_1 = circles; _i < circles_1.length; _i++) {
        var circle = circles_1[_i];
        drawCircle(circle);
        moveCircle(circle);
    }
    requestAnimationFrame(animateCircles);
};
var remap = function (value, low1, high1, low2, high2) {
    return (value - low1) * (high2 - low2) / (high1 - low1) + low2;
};
var changeBackgroundColor = function () {
    backgroundColorCounter = mod(backgroundColorCounter += 1, 6);
};
var setRedValue = function (colorValue) { return circleStyles.red = colorValue; };
var setGreenValue = function (colorValue) { return circleStyles.green = colorValue; };
var setBlueValue = function (colorValue) { return circleStyles.blue = colorValue; };
var reduceOpacity = function () {
    clearInterval(reduceOpacityTimer);
    reduceOpacityTimer = setInterval(function () {
        circleStyles.red += 15;
        circleStyles.blue += 20;
        circleStyles.green -= 20;
        if (circleStyles.red >= 200) {
            clearInterval(reduceOpacityTimer);
            increaseOpacity();
        }
    }, 10);
};
var increaseOpacity = function () {
    clearInterval(increaseOpacityTimer);
    increaseOpacityTimer = setInterval(function () {
        circleStyles.red -= 15;
        circleStyles.blue -= 20;
        circleStyles.green += 20;
        if (circleStyles.red <= 50) {
            clearInterval(increaseOpacityTimer);
        }
    }, 10);
};
