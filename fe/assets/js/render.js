'use strict';

import settings, { elements } from './settings.js'
import helpers from './helpers.js';

const render = {
    clock() {
        // Zeit ermitteln
        let elapsed = Date.now() - settings.startTime;
        elapsed = helpers.secToTime(elapsed / 1000);

        elements.clock.innerHTML = '';

        const spanElapsed = document.createElement('span');
        spanElapsed.className = 'elapsed';
        elements.clock.append(spanElapsed);
        spanElapsed.innerHTML = elapsed;

        const spanFull = document.createElement('span');
        spanFull.className = 'full';
        elements.clock.append(spanFull);
        spanFull.innerHTML = helpers.secToTime(settings.songDuration);

    },
    line(data) {
        let c = elements.c;
        let ctx = c.getContext('2d');

        ctx.clearRect(0, 0, c.width, c.height);
        ctx.strokeStyle = '#fff';
        let barWidth = c.width / data.length;

        ctx.beginPath()
        ctx.moveTo(0, c.height);
        data.forEach((val, i) => {
            ctx.lineTo(
                i * barWidth,
                c.height - (val)
            )
        })
        ctx.stroke();
    }

}

export default render;