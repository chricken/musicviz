'use strict';

const settings = {
    elements: {},
    // Load the MP3 file
    pathAudio: '/music/Black_Shadows.mp3',
    timestamp:100,
    everyNthValue: 20,   // Divisor, der aussagt, wie genau das Spektrum sein soll
    padding:3,
    distress: 0,
    numIterations:1,
    visibility:.1
}

export default settings;
export let elements = settings.elements;