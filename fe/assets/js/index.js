'use strict';

// Imports 
import settings, { elements } from './settings.js';
import render from './render.js';
import helpers from './helpers.js';

import audio from './audio.js';


const domMapping = () => {
    elements.c = document.querySelector('#cSpectrum');
    elements.output = document.querySelector('#outputArr');
    elements.btnReadAudio = document.querySelector('#btnReadAudio');
    elements.stopAudio = document.querySelector('#stopAudio');
    elements.saveAsJSON = document.querySelector('#saveAsJSON');
}

const appendEventListeners = () => {
    elements.btnReadAudio.addEventListener('click', audio.init);
    elements.stopAudio.addEventListener('click', audio.end)
    elements.saveAsJSON.addEventListener('click', helpers.saveAsJSON)
}

const init = () => {
    domMapping();
    appendEventListeners()
}

init();