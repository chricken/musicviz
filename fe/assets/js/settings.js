'use strict';

const settings = {
    elements: {},
    pathAudio: '/music/Inview.mp3',
    pathJSON: '/music/Inview.json',
    isPaused: false,
    maxArrayLength: 500,
    audioResolution: 1024,
    timerAudioToArray: false,
    songDuration: 0,
    startTime: 0,
    // startIndex:4507,
    startIndex: 0,
    indexImage: 0,
    saveImages: true,

    particles: [],
    density: .5,    // Divisor für die Partikel pro Amplitudenhöhe
    ausschnitt: .2, // Wieviel vom Spektrum soll gerendert werden?

    ringWaves: [],
    position: [-1, 0],
    // addTranslate: [-.01, 0],
    // addAddTranslate: [.0001, 0],
}

export default settings;
export let elements = settings.elements;