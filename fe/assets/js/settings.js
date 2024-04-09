'use strict';

const settings = {
    elements: {},
    pathAudio: '/music/Unfallverhutungsvorschrift.mp3',
    pathJSON: '/music/unfallverhutungsvorschrift.json',
    isPaused: false,
    maxArrayLength: 500,
    audioResolution: 128,
    timerAudioToArray: false,
    songDuration: 0,
    startTime: 0,
    startIndex:0,
    indexImage:0,
    saveImages:false,

    particles:[],
    density: .2,    // Divisor für die Partikel pro Amplitudenhöhe
    ausschnitt: 1, // Wieviel vom Spektrum soll gerendert werden?
}

export default settings;
export let elements = settings.elements;