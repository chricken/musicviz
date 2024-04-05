'use strict';

import settings, { elements } from './settings.js';
import ajax from './ajax.js';
import renderViz from './renderviz.js';


// FUNKTIONEN
const domMapping = () => {
    elements.c = document.querySelector('#cDraw')
}

const appendEventlisteners = () => { }

const init = () => {
    domMapping();
    appendEventlisteners();
    ajax.loadJSON(settings.pathJSON).then(
        renderViz.init
    )

}

// INIT
init();