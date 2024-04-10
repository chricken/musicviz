'use strict';

import settings, { elements } from "../settings.js";

class WaveRing {
    constructor(data) {

        this.data = data;

        this.scale = [1, .7];
        this.addScale = .06;
        this.translate = [.5, .5];
        this.addTranslate = [.001, -.001];
        this.rotation = 0;
        this.addRotation = -0.01;
        this.blur = 0;
        this.addBlur =.3;
        this.alpha = 1;
        this.addAlpha = -.03;
        this.lineWidth = 2;
        this.addLineWidth = 1;

        this.amp = 300;

        this.radius = .25;

        this.color = [255, 200, 20];
    }
    update() {
        this.translate[0] += this.addTranslate[0];
        this.translate[1] += this.addTranslate[1];
        this.scale[0] += this.addScale;
        this.scale[1] += this.addScale;
        this.rotation += this.addRotation;
        this.blur += this.addBlur;
        this.alpha += this.addAlpha;
        this.lineWidth += this.addLineWidth;

        if (this.alpha <= 0.2)
            settings.ringWaves = settings.ringWaves.filter(
                ring => ring != this
            );
    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');

        ctx.globalAlpha = this.alpha;
        ctx.filter = `blur(${this.blur}px)`;

        ctx.translate(
            this.translate[0] * c.width,
            this.translate[1] * c.height
        )
        ctx.scale(...this.scale);
        ctx.rotate(this.rotation);

        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = `rgba(${this.color.join(',')},${this.alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, this.radius * c.height);
        this.data.forEach((val, i) => {
            val /= 255;
            val /= c.width;
            val *= this.amp;
            let angle = (Math.PI * 2) / this.data.length * i;
            // sin a = gk / h 
            // gk = sin a * h 
            let deltaX = Math.sin(angle) * (this.radius + val);
            let deltaY = Math.cos(angle) * (this.radius + val);

            ctx.lineTo(
                deltaX * c.width,
                deltaY * c.height
            )

        })
        /*
        ctx.ellipse(
            0, 0,
            this.radius * c.width,
            this.radius * c.height,
            0,
            0, 2 * Math.PI
        );
        */
        ctx.stroke();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

}

export default WaveRing;