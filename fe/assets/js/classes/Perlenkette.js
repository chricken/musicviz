'use strict';

import settings, { elements } from "../settings.js";

class Perlenkette {
    constructor({
        data,
        index,
    }) {
        let value = data[index];
        // data = data.filter((val, i) => i % 1 == 0)
        this.startColor = [value, 255 - value, 60, 1];
        this.targetColor = [0, 100, 30, 0];

        this.age = 0;
        this.speed = .005;

        this.color = [...this.startColor];
        this.lifetime = 40;
        this.size = .01;

        // console.log(value, index, data);

        this.kette = [...new Array(value)].map((val, i) => {
            return {
                x: 1 / data.length * index,
                y: 1 / 255 * i
            }
        });
        // console.log(this.kette);
    }
    update() {
        let c = elements.c;
        this.age++;

        // console.log(this.kette);

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
                // console.log(r, b, this.speed);
                point.x += r * this.speed * 1.5
                point.y += (b + 3) * this.speed;
            }
        })

        // console.log(this.kette);
        // debugger
        if (this.age >= this.lifetime)
            settings.particles = settings.particles.filter(val => val != this);

    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');
        let clr = this.color;

        ctx.strokeStyle = `rgb(${~~clr[0]},${~~clr[1]},${~~clr[2]})`;
        ctx.fillStyle = `rgb(${~~clr[0]},${~~clr[1]},${~~clr[2]})`;

        if (this.kette.length) {

            ctx.lineWidth = (this.age == 0) ? 3 : 1;
            ctx.globalAlpha = (this.age == 0) ? 1 : (1 - (this.age / this.lifetime)) * .3;

            ctx.beginPath();

            this.kette.forEach(point => {
                /*
                ctx.moveTo(
                    point.x * c.width,
                    point.y * c.height / 2
                );
                */
                ctx.lineTo(
                    point.x * c.width,
                    point.y * c.height * .7 + 2
                );
                /*
                ctx.arc(
                    point.x * c.width,
                    point.y * c.height / 2,
                    2,
                    0,
                    2 * Math.PI
                )
                */
            })
            // ctx.fill();
            ctx.stroke();

            let ln = this.kette.length - 1;
            ctx.beginPath()
            ctx.moveTo(
                this.kette[ln].x * c.width,
                this.kette[ln].y * c.height * .7,
            )
            ctx.arc(
                this.kette[ln].x * c.width,
                this.kette[ln].y * c.height * .7,
                this.age == 0 ? 3 : 1,
                0,
                Math.PI * 2
            )
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
    }
}

export default Perlenkette;