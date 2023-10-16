
const canvas = document.getElementById('signalsCanvas') as HTMLCanvasElement
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let yPosition = 40

window.ada.draw((_event, value) => {
    initializeView()
})

window.ada.action((_event, value) => {
    ctx.font = '20px serif'
    ctx.strokeText(actionString(value.label, value.message), canvas.width / 2 - 75, yPosition)
    if (yPosition >= canvas.height - 40) {
        yPosition = 40
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    else yPosition += 50
})

const initializeView = () => {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const actionString = (label: string, action: number[]) => {
    const actions = action.reduce((acc, curr) => acc + ' ' + curr.toString(), '')
    return label + ' ' + actions
}

export {};