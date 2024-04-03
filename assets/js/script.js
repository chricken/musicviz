'use strict';

// Imports 
import settings, { elements } from './settings.js';
import render from './render.js';



// Function to start playing the audio and draw the spectrum
function startPlayback() {
    // Check if the audio is already playing
    if (settings.audioElement.paused) {
        // Start playing the audio
        settings.audioElement.play();

        // Draw the spectrum
        render.lines();
    }
}

const init = () => {
    // Create an audio element and source node
    settings.audioElement = new Audio(settings.pathAudio);
    settings.audioSource = settings.audioContext.createMediaElementSource(settings.audioElement);

    // Analyser node to get audio data
    settings.analyser = settings.audioContext.createAnalyser();
    settings.analyser.fftSize = settings.resolution; // Adjust the FFT size for resolution

    // Connect the audio source to the analyser
    settings.audioSource.connect(settings.analyser);
    settings.audioSource.connect(settings.audioContext.destination);


    // Canvas setup
    elements.c = document.querySelector('#spectrum');
    elements.ctx = elements.c.getContext('2d');
    settings.bufferLength = settings.analyser.frequencyBinCount;
    settings.dataArray = new Uint8Array(settings.bufferLength);
}

// Add an event listener to start playback on button click
const playButton = document.querySelector('#playButton');
playButton.addEventListener('click', startPlayback);

init();