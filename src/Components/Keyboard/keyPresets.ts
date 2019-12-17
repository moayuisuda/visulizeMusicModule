interface singleKey {
    note: string,
    active: boolean,
    type: string,
    code: number,
    key: string
}

interface singleKeyInstance extends singleKey {
    container: PIXI.Sprite
}

let codeMap: Array<singleKey> = [{
    note: 'C4',
    active: false,
    type: 'white',
    code: 81,
    key: 'Q'
}, {
    note: 'C#4',
    active: false,
    type: 'black',
    code: 50,
    key: '2'
}, {
    note: 'D4',
    active: false,
    type: 'white',
    code: 87,
    key: 'W'
}, {
    note: 'D#4',
    active: false,
    type: 'black',
    code: 51,
    key: '3'
}, {
    note: 'E4',
    active: false,
    type: 'white',
    code: 69,
    key: 'E'
}, {
    note: 'F4',
    active: false,
    type: 'white',
    code: 82,
    key: 'R'
}, {
    note: 'F#4',
    active: false,
    type: 'black',
    code: 53,
    key: '5'
}, {
    note: 'G4',
    active: false,
    type: 'white',
    code: 84,
    key: 'T'
}, {
    note: 'G#4',
    active: false,
    type: 'black',
    code: 54,
    key: '6'
}, {
    note: 'A4',
    active: false,
    type: 'white',
    code: 89,
    key: 'Y'
}, {
    note: 'A#4',
    active: false,
    type: 'black',
    code: 55,
    key: '7'
}, {
    note: 'B4',
    active: false,
    type: 'white',
    code: 85,
    key: 'U'
}, {
    note: 'C5',
    active: false,
    type: 'white',
    code: 73,
    key: 'I'
}, {
    note: 'C#5',
    active: false,
    type: 'black',
    code: 57,
    key: '9'
}, {
    note: 'D5',
    active: false,
    type: 'white',
    code: 79,
    key: 'O'
}, {
    note: 'D#5',
    active: false,
    type: 'black',
    code: 48,
    key: '0'
}, {
    note: 'E5',
    active: false,
    type: 'white',
    code: 80,
    key: 'P'
}]



export {
    codeMap,
    singleKeyInstance
}