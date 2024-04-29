'use strict';

import settings, { elements } from '../settings.js';

class Line {
    constructor(points) {
        this.line = [...points];
        this.alpha = 1;
    }
    update() {
        this.alpha *= settings.fadeMultiplier;
        if (this.alpha <= .01) {
            settings.lines = settings.lines.filter(line => line != this);
        }
    }
    render() {

        let c = elements.c;
        let ctx = c.getContext('2d');

        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.moveTo(-10, c.height / 2);
        this.line.forEach((dataPoint, index) => {
            let x = c.width / (this.line.length - 2) * index;
            let y = c.height - (dataPoint * c.height)

            ctx.bezierCurveTo(
                (index == 0) ? 0 : x - (x - (c.width / (this.line.length - 2) * (index - 1))),
                (index == 0) ? y : y - (y - (c.height - (this.line[index - 1] * c.height))),

                (index == this.line.length - 1) ? x : c.width / (this.line.length - 2) * (index + 1),
                (index == this.line.length - 1) ? y : 0,

                x,
                y,
            )
        })
        ctx.stroke();
    }
}

export default Line;