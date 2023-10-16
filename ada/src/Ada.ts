
import * as connection from './MIDI/Connections.js'
import {} from "electron";

import { Ports } from './types/Types.js'
import { processedSet } from './Replay.js';

let ports: Ports

const start = async () => {
    ports = await connection.openPorts('listen')(0, 0)
    process.parentPort.postMessage({
        type: 'ports',
        input: connection.getPortNames(ports.in)[0],
        output: connection.getPortNames(ports.out)[0]
    })
}

process.parentPort.on('message', async (message) => {
    const label = message.data.message
    switch(label) {
        case 'end': 
            connection.closePorts(ports.in, ports.out)
            break
        case 'set':
            process.parentPort.postMessage({
                type: 'set',
                set: await processedSet(0)
            })
            break            
        default: 
            connection.startListener(ports.in, ports.out, label)
            break
    }
})

start()