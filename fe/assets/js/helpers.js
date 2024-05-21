'use strict';
import settings, { elements } from './settings.js';

const helpers = {
    createNumber(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
    },

    secToTime(sec) {
        let min = ~~(sec / 60);
        sec = sec % 60;
        return `${min}:${sec.toFixed(1)}`;
    },
    leading0(num = 0, digits = 2) {
        return ('0000000000000000' + num).substr(-digits);
    },
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