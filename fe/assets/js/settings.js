'use strict';

const settings = {
    elements: {
        vizImg: document.querySelector('#preloader img'),
    },
    pathAudio: '/music/DTCI 2.mp3',
    pathJSON: '/music/DTCI 2.json',
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
    amp:30,

    fadeMultiplier : .85,

    particles: [],
    lines : [],
    density: .005,    // Divisor für die Partikel pro Amplitudenhöhe
    ausschnitt: 500, // Wieviel vom Spektrum soll gerendert werden?
    minLevel: 0, // Dieser Level wird als null definiert
    ringWaves: [],
    position: [-1, 0],

    // addTranslate: [-.01, 0],
    // addAddTranslate: [.0001, 0],
    flowmap:[],
    camX:1,
    camY:2,
    camZ:3,
    speedCamX:0,
    speedCamY:0,
    speedCamZ:5,
    camZoom: 200,
}

export default settings;
export let elements = settings.elements;