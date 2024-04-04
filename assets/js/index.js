'use strict';

// Imports 
import settings, { elements } from './settings.js';
import render from './render.js';

import audio from './audio.js';


const domMapping = () => {
    elements.c = document.querySelector('#cSpectrum');
}

const init = () => {
    domMapping();

    audio.load(settings.pathAudio).then(
        buffer => audio.process(buffer, settings.timestamp)
    ).catch(
        console.warn
    )
}

init();