'use strict';

import settings, { elements } from "../settings.js";

class Particle {
    constructor({
        x = Math.random(),
        y = Math.random(),
        speed = 0,
        angle = 0,
        size = .01
    }) {
        Object.assign(this, { x, y, speed, angle });
        this.size = size;

        this.deltaX = Math.sin(angle) * speed;
        this.deltaY = Math.cos(angle) * speed;

        this.color = [60, 100, 50, 1];
        this.deltaColor = [2, 0, 0, 0.01];

    }
    update() {
        this.x += this.deltaX;
        this.y += this.deltaY;

        this.color[0] = Math.max((this.color[0] - this.deltaColor[0]), 0) + 360 % 360;
        this.color[1] = Math.max(this.color[1] - this.deltaColor[1], 0);
        this.color[2] = Math.max(this.color[2] - this.deltaColor[2], 0);
        this.color[3] = Math.max(this.color[3] - this.deltaColor[3], 0);

        if (this.color[3] <= 0) {
            settings.particles = settings.particles.filter(p => p != this);
        }
    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');
        let clr = this.color;

        ctx.fillStyle = `hsla(${~~clr[0]},${~~clr[1]}%,${~~clr[2]}%,${clr[3]})`;

        ctx.fillRect(
            (this.x - (this.size / 2)) * c.width,
            (this.y - (this.size / 2)) * c.height,
            this.size * c.height,
            this.size * c.height,
        )

    }
}

export default Particle;