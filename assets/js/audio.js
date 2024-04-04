'use strict';

import settings, { elements } from './settings.js';
import render from './render.js';

// Analyser node to get audio data
let audioElement, analyser;

let audioArr = [];

const audio = {
    audioToArr() {

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        // Request animation frame for smooth rendering

        // Get the audio data and draw the spectrum
        analyser.getByteFrequencyData(dataArray);

        audioArr.push([...dataArray]);

        render.line([...dataArray]);

        // console.log(audioArr);
        if (!settings.isPaused) {
            requestAnimationFrame(audio.audioToArr);
        } else {
            audioElement.pause();
        }
    },
    end() {
        settings.isPaused = true;
        let value = JSON.stringify(audioArr);
        value = value.split('[').join('\n[');
        elements.output.value = value;
    },
    init() {
        const audioFile = settings.pathAudio;

        // Create an audio element and source node
        audioElement = new Audio(audioFile);
        const audioContext = new window.AudioContext();

        const audioSource = audioContext.createMediaElementSource(audioElement);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = settings.audioResolution; // Adjust the FFT size for resolution

        // Connect the audio source to the analyser
        audioSource.connect(analyser);
        audioSource.connect(audioContext.destination);

        audioArr.length = 0;

        audioElement.play();
        audio.audioToArr()
    }
};


export default audio;