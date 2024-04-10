'use strict';

import settings, { elements } from "../settings.js";

class Particle {
    constructor({
        x = Math.random(),
        y = Math.random(),
        speed = 0,
        angle = 0,
        spread = 0,
        size = .01,
        lifetime = 30,

        startColor = [60, 100, 60, 1],
        targetColor = [0, 100, 30, 0],
    }) {
        Object.assign(this, {
            x, y, speed,
            angle: angle + Math.random() * spread - (spread / 2)
        });
        // console.log(this);
        // this.angle += (Math.random() * spread - (spread / 2));

        this.size = size;
        this.startTimestamp = settings.indexImage;

        this.deltaX = Math.sin(this.angle) * this.speed;
        this.deltaY = Math.cos(this.angle) * this.speed;

        this.startColor = startColor;
        this.targetColor = targetColor;
        this.color = [0, 0, 0, 0]
        this.lifetime = lifetime;
    }
    update() {
        this.x += this.deltaX;
        this.y += this.deltaY;
        let timestamp = settings.indexImage - this.startTimestamp;

        for (let i = 0; i <= 3; i++) {
            this.color[i] = this.startColor[i] + ((this.targetColor[i] - this.startColor[i]) / this.lifetime * timestamp)
        }

        if (timestamp > this.lifetime) {
            settings.particles = settings.particles.filter(p => p != this);
        }

    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');
        let clr = this.color;

        ctx.fillStyle = `rgb(${~~clr[0]},${~~clr[1]},${~~clr[2]})`;

        ctx.fillRect(
            (this.x - (this.size / 2)) * c.width,
            (this.y - (this.size / 2)) * c.height,
            this.size * c.height,
            this.size * c.height,
        )

    }
}

export default Particle;