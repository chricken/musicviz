'use strict';

import settings, { elements } from './settings.js';
import render from './render.js';
import helpers from './helpers.js';

// Analyser node to get audio data
let audioElement, analyser;

let audioArr = [];

const audio = {
    audioToArr() {
        render.clock();

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        // Request animation frame for smooth rendering

        // Get the audio data and draw the spectrum
        analyser.getByteFrequencyData(dataArray);

        audioArr.push([...dataArray]);

        render.line([...dataArray]);

        if(Date().now > (settings.songDuration*1000) + settings.startTime + 1000 ){
            audio.end();
        }

        // console.log(audioArr);
        if (settings.isPaused ) {
            clearInterval(settings.timerAudioToArray);
            audioElement.pause();
        }
    },
    end() {
        settings.isPaused = true;
        // Ich kann nicht einfach alle [0,0,0,0,0,0,...] löschen, da mitten im Song auch leere Felder sein könnten
        while(audioArr[0].every(val => val == 0)){
            audioArr.shift();
        }
        while(audioArr[audioArr.length-1].every(val => val == 0)){
            audioArr.pop();
        }
        console.log(audioArr.length,audioArr.length/30);
        let value = JSON.stringify(audioArr);
        value = value.split('[').join('\n[');
        elements.output.value = value;
    },
    init() {
        // Create an audio element and source node
        audioElement = new Audio(settings.pathAudio);

        settings.startTime = Date.now();

        setTimeout(() => {
            settings.songDuration = audioElement.duration;
            console.log(helpers.secToTime(audioElement.duration));
        }, 100)

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