'use strict';

import settings, { elements } from './settings.js';
class Perlin {
    constructor(p) {
        this.p = [...new Array(512)];
        this.permutation = typeof p !== 'undefined' ? p : this.p.map(() => ~~(Math.random() * 256));
        for (let i = 0; i < 256; i++)
            this.p[256 + i] = this.p[i] = this.permutation[i];
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t, a, b) {
        return a + t * (b - a);
    }

    grad(hash, x, y, z) {
        let h = hash & 15;
        let u = h < 8 ? x : y,
            v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    noise(x, y, z) {
        let floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);
        let X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;
        x -= floorX;
        y -= floorY;
        z -= floorZ;
        let xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1;
        let u = this.fade(x), v = this.fade(y), w = this.fade(z);
        let A = this.p[X] + Y, AA = this.p[A] + Z, AB = this.p[A + 1] + Z,
            B = this.p[X + 1] + Y, BA = this.p[B] + Z, BB = this.p[B + 1] + Z;

        return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z),
            this.grad(this.p[BA], xMinus1, y, z)),
            this.lerp(u, this.grad(this.p[AB], x, yMinus1, z),
                this.grad(this.p[BB], xMinus1, yMinus1, z))),
            this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, zMinus1),
                this.grad(this.p[BA + 1], xMinus1, y, zMinus1)),
                this.lerp(u, this.grad(this.p[AB + 1], x, yMinus1, zMinus1),
                    this.grad(this.p[BB + 1], xMinus1, yMinus1, zMinus1))));
    }
}

const flowmap = {
    cFlowMap: false,
    visualize() {
        if (!flowmap.cFlowMap) {
            flowmap.cFlowMap = document.createElement('canvas');
        }
        const c = flowmap.cFlowMap;
        const ctx = c.getContext('2d');

        document.body.append(c);
        // console.log(settings.flowmap);
        // debugger
        c.width = settings.flowmap[0].r.length;
        c.height = settings.flowmap.length;

        let imgData = ctx.getImageData(0, 0, c.width, c.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            let x = Math.floor((i / 4) % c.width);
            let y = Math.floor((i / 4) / c.width);
            // console.log(x,y);
            if (settings.flowmap[y]) {
                imgData.data[i + 0] = ~~(settings.flowmap[y].r[x] * 255);
                imgData.data[i + 1] = 0;    //~~(settings.flowmap[y][x] * 255);
                imgData.data[i + 2] = ~~(settings.flowmap[y].b[x] * 255);
                imgData.data[i + 3] = 255;
            }
        }
        ctx.putImageData(imgData, 0, 0);

    },
    update(x = 0, y = 0, z = 0) {
        settings.flowmap.length = 0;
        for (let i = 0; i < elements.c.height; i++) {

            let rowR = [];
            let rowB = [];
            
            for (let j = 0; j < elements.c.width; j++) {
                rowR.push(flowmap.perlinR.noise(
                    (j + x) / settings.camZoom,
                    i / settings.camZoom,
                    z / settings.camZoom
                ));
                rowB.push(flowmap.perlinB.noise(
                    (j + x) / settings.camZoom,
                    (i + y) / settings.camZoom,
                    z / settings.camZoom
                ));
            }
            settings.flowmap.push({
                r: rowR,
                b: rowB,
            });
        }
        // flowmap.visualize();
        // console.log(settings.flowmap);
    },
    init() {
        flowmap.perlinR = new Perlin();
        flowmap.perlinB = new Perlin();
        flowmap.update(settings.camX, settings.camY, settings.camZ);
    }
}

export default flowmap;