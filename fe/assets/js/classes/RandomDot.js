'use strict';

import settings, { elements } from "../settings.js";

class RandomDot {
    constructor(
        value,
        index,
        length
    ) {
        // console.log(value, index, length);
        // data = data.filter((val, i) => i % 1 == 0)
        this.startColor = [0, 0, 255, 1];
        this.targetColor = [0, 255, 0, 0];

        this.age = 0;
        this.speed = .005;

        let range = 1 / length;
        this.x = Math.random() * range + (1 / length * index);
        this.y = Math.random();

        this.color = [...this.startColor];
        this.lifetime =4;
        this.size = .01;

    }
    update() {
        let c = elements.c;
        this.age++;
        this.y -= this.speed;
        if (this.age > this.lifetime) {
            settings.particles = settings.particles.filter(el => el != this);
        }
    }
    render(imgData) {
        let c = elements.c;
        let ctx = c.getContext('2d');
        
        ctx.globalAlpha = 1 / this.lifetime * this.age;

        ctx.fillRect(
            this.x * c.width,
            this.y * c.height,
            3, 3
        )

    }
}

export default RandomDot;