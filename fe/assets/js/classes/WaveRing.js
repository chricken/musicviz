'use strict';

import settings, { elements } from "../settings.js";

class WaveRing {
    constructor({
        data,
        startColor = [255, 255, 120, 1],
        targetColor = [255, 0, 0, .3],
        lifetime = 20,
        addTranslate = [.002, .003],
    }) {
        this.data = data;
        this.lifetime = lifetime;
        this.currentFrame = 0;

        this.scale = [1, 1];
        this.multiplyScale = .95;
        this.multiplyScale = 1.03;

        this.translate = [.5, .55];
        this.addTranslate = addTranslate;

        this.rotation = Math.PI;
        this.addRotation = 0.01;

        this.blur = 0;
        this.addBlur = .3;
        // this.addBlur = 0;

        this.lineWidth = 3;
        this.addLineWidth = .2;

        this.amp = -250;
        this.addAmp = this.amp / this.lifetime;

        this.radius = .25;

        this.startColor = startColor;
        this.targetColor = targetColor;
        this.color = startColor;
    }
    update() {
        this.currentFrame++;
        this.translate[0] += this.addTranslate[0];
        this.translate[1] += this.addTranslate[1];
        this.scale[0] *= this.multiplyScale;
        this.scale[1] *= this.multiplyScale;
        this.rotation += this.addRotation;
        this.blur += this.addBlur;
        this.lineWidth += this.addLineWidth;
        this.amp -= this.addAmp;

        this.color = this.startColor.map((chnl1, index) => {
            let chnl2 = this.targetColor[index];
            let delta = (chnl1 - chnl2) / this.lifetime * this.currentFrame;
            return (chnl1 - delta);
        })
        // console.log(this.color);

        if (this.currentFrame >= this.lifetime) {
            settings.ringWaves = settings.ringWaves.filter(
                ring => ring != this
            );
        }
    }
    render() {
        let c = elements.c;
        let ctx = c.getContext('2d');

        ctx.filter = `blur(${this.blur}px)`;

        ctx.translate(
            this.translate[0] * c.width,
            this.translate[1] * c.height
        )
        ctx.scale(...this.scale);
        ctx.rotate(this.rotation);

        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = `rgba(${this.color.join(',')})`;
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