'use strict';

import settings, { elements } from "../settings.js";

class Perlenkette {
    constructor({
        value,
        index,
    }) {
        Object.assign(this, {
            x, y, speed,
            angle: angle + Math.random() * spread - (spread / 2)
        });
        this.startColor = [60, 100, 60, 1];
        this.targetColor = [0, 100, 30, 0];
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
      
    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');
        let clr = this.color;

        ctx.fillStyle = `rgb(${~~clr[0]},${~~clr[1]},${~~clr[2]})`;

    }
}

export default Perlenkette;