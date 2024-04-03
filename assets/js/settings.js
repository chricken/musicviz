'use strict';

const settings = {
    elements: {},
    // Load the MP3 file
    pathAudio: '/music/Black_Shadows.mp3',
    audioContext: new window.AudioContext(),
    audioElement: false,
    audioSource: false,
}

export default settings;
export let elements = settings.elements;