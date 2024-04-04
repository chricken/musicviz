'use strict';

const settings = {
    elements: {},
    // Load the MP3 file
    pathAudio: '/music/Black_Shadows.mp3',
    audioContext: new window.AudioContext(),
    audioElement: false,
    audioSource: false,
    analyser: false,
    bufferLength: false,
    dataArray: false,

    resolution: 32,
    padding:3,
    distress: 15,
    numIterations:300,
    visibility:.1
}

export default settings;
export let elements = settings.elements;