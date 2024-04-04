'use strict';
import settings, { elements } from './settings.js'

const helpers = {
    saveAsJSON() {
        let val = elements.output.value;

        const blob = new Blob([val], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();

        URL.revokeObjectURL(url);
    }
}

export default helpers;