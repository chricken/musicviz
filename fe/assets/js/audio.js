'use strict';

import settings, { elements } from './settings.js';
import render from './render.js';
import helpers from './helpers.js';

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
        if (settings.isPaused) {
            clearInterval(settings.timerAudioToArray);
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
        // Create an audio element and source node
        audioElement = new Audio(settings.pathAudio);
        setTimeout(() => {
            settings.songDuration = audioElement.duration;
            console.log(helpers.secToTime(audioElement.duration));
        }, 1000)
        console.log(audioElement);
        const audioContext = new window.AudioContext();

        const audioSource = audioContext.createMediaElementSource(audioElement);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = settings.audioResolution; // Adjust the FFT size for resolution

        // Connect the audio source to the analyser
        audioSource.connect(analyser);
        audioSource.connect(audioContext.destination);

        audioArr.length = 0;

        audioElement.play();
        settings.timerAudioToArray = setInterval(audio.audioToArr, 33);
    }
};


export default audio;