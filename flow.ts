const canvas = document.getElementById('flowCanvas') as HTMLCanvasElement
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth - 50
canvas.height = window.innerHeight - 50

type FlowParticle = {
    x: number
    y: number
    speedX: number
    speedY: number
    speedModifier: number
    angle: number
    history: [{
        x: number,
        y: number
    }],
    maxLength: number
    timer: number
    color: number[],
    nextColorIndex: number,
    colorReached: boolean[]
}

const CELL_SIZE = 20
const CURVE = 5
const ZOOM = 0.1
const ROWS = Math.floor(canvas.height / CELL_SIZE)
const COLS = Math.floor(canvas.width / CELL_SIZE)

let flowParticles: FlowParticle[] = []
let flowField: number[] = []
let colors: number[][] = [
    [252, 186, 3], 
    [212, 129, 4], 
    [230, 104, 21], 
    [230, 70, 21], 
    [237, 61, 7], 
    [237, 38, 7], 
    [237, 134, 7]
]

const initializeFlow = (numParticles: number) => {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 3

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            let angle = (Math.cos(x * ZOOM) + Math.sin(y * ZOOM)) * CURVE
            flowField.push(angle)
        }
    }

    for (let i = 0; i < numParticles; i++) {        
        flowParticles.push(newFlowParticle(canvas.width, canvas.height))
    }
}

const colorString = (color: number[]) => {
    return 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ',1)'
}

const updateColor = (flowParticle: FlowParticle) => {
    const nextIndex = flowParticle.nextColorIndex
    // for r, g, and b of the current color
    for (let i = 0; i < 3; i++) {
        // find the difference between the next and current color
        const difference = colors[nextIndex][i] - flowParticle.color[i]
        // if the colors are the same, mark it
        if (difference === 0) {
            // if necessary, check if the full color matches and pick next color if so
            if (!flowParticle.colorReached[i]) {
                flowParticle.colorReached[i] = true
                // check if all pixels have reached the next color
                // if so, (or on initialization), pick the next color and set pixel states to false
                const allPixelsDone = flowParticle.colorReached.reduce((acc, curr) => acc && curr, true)
                if (allPixelsDone) {
                    flowParticle.nextColorIndex = Math.floor(Math.random() * colors.length)
                    flowParticle.colorReached = [false, false, false]
                }
            }
            // no need to increment
            continue
        }
        // if they're not the same, increment the primary color towards its pair in the next color
        difference > 0
            ? flowParticle.color[i] += 2
            : flowParticle.color[i] += 2
    }
}

const newFlowParticle = (width: number, height: number): FlowParticle => {
    let x = Math.floor(Math.random() * width)
    let y = Math.floor(Math.random() * height)
    let maxLength = Math.floor(Math.random() * 200 + 10)
    return {
        x: x,
        y: y,
        speedX: 0,
        speedY: 0,
        speedModifier: Math.floor(Math.random() * 3 + 1),
        angle: 0,
        history: [{x: x, y: y}],
        maxLength: maxLength,
        timer: maxLength * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        nextColorIndex: 4,
        colorReached: [false, false, false]
    }
}

const drawFlowParticle = (flowParticle: FlowParticle) => {
    ctx.beginPath()
    ctx.moveTo(flowParticle.history[0].x, flowParticle.history[0].y)
    for (let h of flowParticle.history) {
        ctx.lineTo(h.x, h.y)
    }
    ctx.strokeStyle = colorString(flowParticle.color)
    ctx.stroke()
}

const updateFlowParticle = (flowParticle: FlowParticle) => {
    flowParticle.timer--
    if (flowParticle.timer >= 1) {
        let x = Math.floor(flowParticle.x / CELL_SIZE)
        let y = Math.floor(flowParticle.y / CELL_SIZE)
        let index = y * COLS + x

        flowParticle.angle = flowField[index]

        flowParticle.speedX = Math.cos(flowParticle.angle)
        flowParticle.speedY = Math.sin(flowParticle.angle)

        flowParticle.x += flowParticle.speedX * flowParticle.speedModifier
        flowParticle.y += flowParticle.speedY * flowParticle.speedModifier

        flowParticle.history.push({x: flowParticle.x, y: flowParticle.y})

        if (flowParticle.history.length > flowParticle.maxLength) {
            flowParticle.history.shift()
        }
    }
    else if (flowParticle.history.length > 1) {
        flowParticle.history.shift()
    } else {
        flowParticle.x = Math.floor(Math.random() * canvas.width)
        flowParticle.y = Math.floor(Math.random() * canvas.height)
        flowParticle.history = [{x: flowParticle.x, y: flowParticle.y}]
        flowParticle.timer = flowParticle.maxLength * 2
    }
    
}

const drawFlow = () => {
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let particle of flowParticles) {
        
        drawFlowParticle(particle)
        updateFlowParticle(particle)
    }
    requestAnimationFrame(drawFlow)
}

setInterval(() => {
    for (let particle of flowParticles) {
        updateColor(particle)
        particle.color = colors[particle.nextColorIndex]
    }
}, 100)

initializeFlow(500)
drawFlow()

export {};