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
        ctx.moveTo(this.line[0], this.line[1]);
        // console.log(this.line);
        for (let i = 0; i < this.line.length - 6; i++) {

            ctx.bezierCurveTo(
                this.line[i + 0] * c.width,
                this.line[(this.line.length - i) + 1] * c.height,
                this.line[i + 2] * c.width,
                this.line[(this.line.length - i) + 3] * c.height,
                this.line[i + 4] * c.width,
                this.line[(this.line.length - i) + 5] * c.height,
            )
        }
        ctx.stroke();
    }
}

export default Line;