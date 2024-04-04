'use strict';

import render from './render.js';

const audio = {
    process(buffer, timestamp) {
        // Calculate the sample index based on the timestamp
        const sampleRate = buffer.sampleRate;
        const sampleIndex = Math.floor(sampleRate * timestamp);

        // Get the audio data for the given timestamp
        const channelData = buffer.getChannelData(0); // Assuming mono audio
        const spectrum = channelData.slice(sampleIndex, sampleIndex + 2048); // Adjust the slice length as needed

        // Process the spectrum data
        // You can access the spectrum values in the 'spectrumData' array
        render.lines(spectrum);
    },

    load(filename) {

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        return fetch(filename)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))

    }
}

export default audio;