type Circle = {
    radius: number
    x: number
    y: number
    xVel: number
    yVel: number
}

type ColorStyle = {
    red: number
    green: number
    blue: number
    opacity: number
}

const canvas = document.getElementById('circlesCanvas') as HTMLCanvasElement
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.ada.draw((_event, value) => {
    initializeCircles(75)
    animateCircles()
})

window.ada.action((_event, value) => {
    const actionValue = value.message[2]
    switch(value.label) {
        case 'beat':
            reduceOpacity()
            changeBackgroundColor()
            break
        case 'EQHigh': 
            setRedValue(remap(actionValue, 0, 127, 0, 255))
            break
        case 'EQMid': 
            setGreenValue(remap(actionValue, 0, 127, 0, 255))
            break
        case 'EQLow': 
            setBlueValue(remap(actionValue, 0, 127, 0, 255))
            break
    }
})

const CIRCLE_RADIUS = 20
let circles: Circle[] = []

const newColorStyle = (red, green, blue, opacity) => {
    return {
        red: red,
        green: green,
        blue: blue,
        opacity: opacity
    }
}

let circleStyles = newColorStyle(255, 255, 255, 1)
let backgroundStyles = 
    [
        newColorStyle(15, 48, 59, 0.3),
        newColorStyle(77, 19, 50, 0.3),
        newColorStyle(21, 38, 5, 0.3),
        newColorStyle(43, 49, 59, 0.3),
        newColorStyle(46, 21, 4, 0.3),
        newColorStyle(24, 13, 36, 0.3)
    ]

let backgroundColorCounter = 0
let reduceOpacityTimer;
let increaseOpacityTimer;


const mod = (n, m) => {
    return ((n % m) + m) % m;
}

const randFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randVelocity = () => Math.ceil(Math.random() * 3)

const newCircle = () => {
    return {
        radius: CIRCLE_RADIUS,
        x: randFromInterval(CIRCLE_RADIUS, canvas.width - CIRCLE_RADIUS),
        y: randFromInterval(CIRCLE_RADIUS, canvas.height - CIRCLE_RADIUS),
        xVel: randVelocity(),
        yVel: randVelocity(),
    }
}

const colorString = (styles: ColorStyle) => {
    return 'rgba(' + styles.red + ', ' + styles.green + ', ' + styles.blue + ', ' + styles.opacity + ')'
}

const drawCircle = (circle: Circle) => {
    ctx.beginPath()
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false)
    ctx.strokeStyle = colorString(circleStyles)
    ctx.stroke()
    ctx.closePath()
}

const moveCircle = (circle: Circle) => {
    if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
        circle.xVel = -circle.xVel
    }

    if (circle.y + circle.radius > canvas.height  || circle.y - circle.radius < 0) {
        circle.yVel = -circle.yVel
    }

    circle.x += circle.xVel
    circle.y += circle.yVel
}

const initializeCircles = (numCircles: number) => {
    for (let i = 0; i < numCircles; i++) {
        circles.push(newCircle())
    }
}

const animateCircles = () => {
    const counter = backgroundColorCounter
    ctx.fillStyle = colorString(backgroundStyles[counter])
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let circle of circles) {
        drawCircle(circle)
        moveCircle(circle)
    }
    requestAnimationFrame(animateCircles)
}

const remap = (value, low1, high1, low2, high2) => {
    return (value - low1) * (high2 - low2) / (high1 - low1) + low2;
};

const changeBackgroundColor = () => {
    backgroundColorCounter = mod(backgroundColorCounter += 1, 6)
}

const setRedValue = (colorValue: number) => circleStyles.red = colorValue
const setGreenValue = (colorValue: number) => circleStyles.green = colorValue
const setBlueValue = (colorValue: number) => circleStyles.blue = colorValue

const reduceOpacity = () => {
    clearInterval(reduceOpacityTimer)
    reduceOpacityTimer = setInterval(() => {
        circleStyles.red += 15
        circleStyles.blue += 20
        circleStyles.green -= 20
        if (circleStyles.red >= 200) {
            clearInterval(reduceOpacityTimer)
            increaseOpacity()
        }
    }, 10)
}

const increaseOpacity = () => {
    clearInterval(increaseOpacityTimer)
    increaseOpacityTimer = setInterval(() => {
        circleStyles.red -= 15
        circleStyles.blue -= 20
        circleStyles.green += 20
        if (circleStyles.red <= 50) {
            clearInterval(increaseOpacityTimer)
        }
    }, 10)
}

export {};