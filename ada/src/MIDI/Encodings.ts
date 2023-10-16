export const ActionLabel = (controller: number): string => {
    switch(controller) {
        case 0: return 'moveVertical'
        case 4: return 'loopToggle'
        case 5: return 'loopSize'
        case 6: return 'jumpSize'
        case 7: return 'jumpForward'
        case 8: return 'jumpBackward'
        case 10: return 'pfl'
        case 11: return 'loadTrack'

        case 33: return 'scratch'
        case 34: return 'wheelTurn'
        case 39: return 'masterGain'
        case 40: return 'pregain'
        case 42: return 'crossfader'
        case 45: return 'volume'
        case 46: return 'rate'
       
        case 64: return 'beat'
        case 65: return 'hotcue1'
        case 66: return 'hotcue2'
        case 67: return 'hotcue3'
        case 68: return 'hotcue4'
        case 69: return 'keylock'
        case 70: return 'EQHigh'
        case 71: return 'EQMid'
        case 72: return 'EQLow'
        case 73: return 'filter'
        case 74: return 'fxMix'
        case 75: return 'fx1'
        case 76: return 'fx2'
        case 77: return 'fx3'
        case 80: return 'play'
        case 82: return 'sync'
        case 81: return 'scratchEnabled'
        case 83: return 'cue'
      
        default: return 'unknown'
    }
}

export const DeckLabel = (status: number): string => {
    switch(status) {
        case 0xb0: return 'Master'
        case 0xb1: return 'Deck1'
        case 0xb2: return 'Deck2'
        case 0xb3: return 'Library'

        default: return 'unknown'
    }
}