'use strict';

import settings, { elements } from '../settings.js';
import helpers from '../helpers.js';

class ParticleFlowMap {
    constructor(value) {
        this.x = 1/255*value;//Math.random() ;
        this.y = Math.random();
        this.speedX = helpers.createNumber(-30, 30) / 10000;
        this.speedY = helpers.createNumber(-30, 30) / 10000;
        this.size = .0002;
        this.size *= ((255 - value) / 50) ** 2;
        this.color = `hsl(${Math.min(value * 2, 360)},100%,${helpers.createNumber(20,50)}%)`;
        this.lifetime = 30;
        this.points = [];
    }
    update() {

        if (--this.lifetime > 0) {
            this.x += this.speedX;
            this.y += this.speedY;
            this.points.push({ x: this.x, y: this.y });

        } else {
            this.points.shift();
        }

        if (!this.points.length)
            settings.particles = settings.particles.filter(p => p != this);

    }
    hitBorder() {

    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');

        // console.log(this);

        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineCap = 'round';
        ctx.beginPath();

        /*
        ctx.arc(
            this.x * c.width,
            this.y * c.height,
            this.size * c.width,
            0,
            2 * Math.PI,
        )
        ctx.fill();

        */
        ctx.lineWidth = this.size * c.width * (0 + (this.lifetime - this.points.length) / 20);
        if (this.points.length) {

            ctx.moveTo(
                this.points[0].x * c.width,
                this.points[0].y * c.height
            )

            this.points.forEach(point => {
                ctx.lineTo(
                    point.x * c.width,
                    point.y * c.height
                )
            })
        }

        // ctx.fill();
        ctx.stroke();
    }
}

export default ParticleFlowMap;