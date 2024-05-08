'use strict';

import settings, { elements } from "../settings.js";

class Perlenkette {
    constructor({
        value,
        index,
        data
    }) {
        data = data.filter((val, i) => i % 3 == 0)
        this.startColor = [value, 255 - value, 60, 1];
        this.targetColor = [0, 100, 30, 0];

        this.age = 0;
        this.speed = .005;

        this.color = [...this.startColor];
        this.lifetime = 20;
        this.size = .01;

        this.kette = [...new Array(value)].map((val, i) => {
            return {
                x: 1 / data.length * index,
                y: 1 / 255 * i
            }
        });
    }
    update() {
        let c = elements.c;
        this.age++;

        this.kette.forEach(point => {
            let x = ~~(point.x * c.width);
            let y = ~~(point.y * c.height);
            if (
                settings.flowmap[y]
                && settings.flowmap[y].r[x]
                && settings.flowmap[y].b[x]
            ) {
                let r = settings.flowmap[y].r[x];
                let b = settings.flowmap[y].b[x];
                // console.log(r, b);
                point.x += r * this.speed * 2
                point.y -= (b + 3) * this.speed * 3
            }
        })
        if (this.age >= this.lifetime)
            settings.particles = settings.particles.filter(val => val != this);

    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');
        let clr = this.color;

        if (this.age < 2)
            ctx.globalAlpha = 1;
        else
            ctx.globalAlpha = 1 - ((this.age / this.lifetime) ** .02);

        ctx.strokeStyle = `rgb(${~~clr[0]},${~~clr[1]},${~~clr[2]})`;
        ctx.fillStyle = `rgb(${~~clr[0]},${~~clr[1]},${~~clr[2]})`;

        if (this.kette.length) {

            if (this.age < 2) ctx.lineWidth = 5;
            else if (this.age < this.lifetime / 2) ctx.lineWidth = 1;
            else ctx.lineWidth = .5;

            ctx.beginPath();

            this.kette.forEach(point => {
                ctx.moveTo(
                    this.kette[0].x * c.width,
                    this.kette[0].y * c.height / 2
                );
                ctx.lineTo(
                    point.x * c.width,
                    point.y * c.height / 2 + 2
                );
            })
            ctx.stroke();

            ctx.beginPath()
            ctx.arc(
                this.kette[0].x * c.width,
                this.kette[0].y * c.height,
                this.size * c.width,
                0,
                Math.PI * 2
            )
            ctx.fill();
            console.log(
                this.kette[0].x * c.width,
                this.kette[0].y * c.height,
                this.size * c.width,
                0,
                Math.PI * 2
            );
            debugger
        }
    }
}

export default Perlenkette;