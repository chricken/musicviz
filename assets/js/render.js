'use strict';
import settings, { elements } from './settings.js'

const render = {
    line(data) {
        let c = elements.c;
        let ctx = c.getContext('2d');

        ctx.clearRect(0, 0, c.width, c.height);
        ctx.strokeStyle='#fff';
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