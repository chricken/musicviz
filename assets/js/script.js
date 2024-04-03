'use strict';

// Imports 
import setting, { elements } from './setting.js';
import render from './render.js';





// Analyser node to get audio data
const analyser = audioContext.createAnalyser();
analyser.fftSize = 128; // Adjust the FFT size for resolution

// Connect the audio source to the analyser
settings.audioSource.connect(analyser);
settings.audioSource.connect(audioContext.destination);


// Canvas setup
const canvas = document.getElementById('spectrum-canvas');
const canvasContext = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Draw function to visualize the spectrum
const render = () => {
    // Request animation frame for smooth rendering
    requestAnimationFrame(render);

    // Get the audio data and draw the spectrum
    analyser.getByteFrequencyData(dataArray);

    // Clear the canvas for new frames
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate the width of each bar in the spectrum
    const barWidth = canvasWidth / bufferLength;
    let x = 0;

    const myGradient = canvasContext.createLinearGradient(0, 0, 0, canvas.height);
    myGradient.addColorStop(0, '#f00');
    myGradient.addColorStop(0.5, '#ff0');
    myGradient.addColorStop(.7, '#0f0');
    myGradient.addColorStop(1, '#000');

    // Iterate through the data array and draw the bars
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * (canvasHeight / 255);

        // Set the bar color based on its height
        const r = barHeight + 250;
        const g = 250 - barHeight;
        const b = 50;



        // Draw the bar
        // canvasContext.fillStyle = `rgb(${r}, ${g}, ${b})`;
        canvasContext.fillStyle = myGradient;
        canvasContext.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);

        // Move to the next position
        x += barWidth + 1;
    }
}

// Function to start playing the audio and draw the spectrum
function startPlayback() {
    // Check if the audio is already playing
    if (settings.audioElement.paused) {
        // Start playing the audio
        settings.audioElement.play();

        // Draw the spectrum
        render();
    }
}

const init = () => {
    // Create an audio element and source node
    settings.audioElement = new Audio(audioFile);
    settings.audioSource = audioContext.createMediaElementSource(settings.audioElement);
}

// Add an event listener to start playback on button click
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', startPlayback);

init();