'use strict';

const settings = {
    elements: {
        vizImg: document.querySelector('#preloader img'),
    },
    pathAudio: '/music/sappalot.mp3',
    pathJSON: '/music/sappalot.json',
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
    amp:1,

    fadeMultiplier : .9,

    particles: [],
    lines : [],
    density: .15,    // Divisor für die Partikel pro Amplitudenhöhe
    ausschnitt: 500, // Wieviel vom Spektrum soll gerendert werden?
    minLevel: 50, // Dieser Level wird als null definiert
    ringWaves: [],
    position: [-1, 0],

    // addTranslate: [-.01, 0],
    // addAddTranslate: [.0001, 0],

}

export default settings;
export let elements = settings.elements;