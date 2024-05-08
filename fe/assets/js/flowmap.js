'use strict';

import settings, { elements } from './settings.js';
class Perlin {
    constructor(p) {
        this.p = [...new Array(512)];
        this.permutation = typeof p !== 'undefined' ? p : this.p.map(() => ~~(Math.random() * 256));
        /* 
                for (let i = 0; i < 256; i++)
                    this.p[256 + i] = this.p[i] = this.permutation[i];
        */
        // Um jeden Durchlauf identisch zu mchen, wird das ARray mit festen Werten belegt
        this.p = [38, 235, 136, 132, 33, 248, 105, 76, 207, 172, 186, 36, 176, 217, 138, 176, 46, 160, 112, 87, 225, 101, 211, 253, 130, 233, 213, 227, 165, 90, 237, 42, 87, 252, 139, 37, 140, 164, 54, 19, 226, 105, 238, 112, 202, 247, 233, 44, 124, 183, 183, 93, 203, 32, 31, 38, 164, 199, 91, 199, 241, 24, 227, 155, 57, 217, 244, 19, 131, 30, 92, 88, 130, 137, 57, 232, 160, 170, 247, 182, 15, 123, 158, 145, 189, 39, 124, 76, 141, 40, 89, 14, 207, 38, 14, 236, 229, 209, 97, 104, 82, 103, 171, 47, 108, 112, 89, 158, 135, 122, 84, 166, 42, 27, 62, 199, 129, 204, 166, 222, 62, 130, 76, 94, 136, 98, 171, 157, 186, 34, 149, 251, 28, 159, 100, 63, 164, 120, 155, 197, 43, 159, 37, 59, 180, 13, 67, 20, 254, 160, 51, 146, 53, 176, 202, 219, 68, 199, 243, 111, 49, 150, 51, 194, 146, 226, 49, 218, 139, 96, 185, 253, 52, 52, 15, 153, 55, 122, 12, 146, 215, 47, 102, 245, 253, 83, 23, 34, 188, 72, 198, 111, 67, 176, 122, 31, 202, 51, 237, 135, 61, 33, 210, 128, 115, 211, 173, 191, 130, 134, 167, 71, 65, 233, 215, 148, 231, 52, 137, 240, 179, 190, 192, 124, 20, 83, 195, 198, 230, 114, 236, 127, 79, 201, 120, 125, 94, 38, 132, 136, 156, 127, 17, 112, 170, 68, 24, 26, 7, 133, 24, 248, 35, 24, 162, 184, 38, 235, 136, 132, 33, 248, 105, 76, 207, 172, 186, 36, 176, 217, 138, 176, 46, 160, 112, 87, 225, 101, 211, 253, 130, 233, 213, 227, 165, 90, 237, 42, 87, 252, 139, 37, 140, 164, 54, 19, 226, 105, 238, 112, 202, 247, 233, 44, 124, 183, 183, 93, 203, 32, 31, 38, 164, 199, 91, 199, 241, 24, 227, 155, 57, 217, 244, 19, 131, 30, 92, 88, 130, 137, 57, 232, 160, 170, 247, 182, 15, 123, 158, 145, 189, 39, 124, 76, 141, 40, 89, 14, 207, 38, 14, 236, 229, 209, 97, 104, 82, 103, 171, 47, 108, 112, 89, 158, 135, 122, 84, 166, 42, 27, 62, 199, 129, 204, 166, 222, 62, 130, 76, 94, 136, 98, 171, 157, 186, 34, 149, 251, 28, 159, 100, 63, 164, 120, 155, 197, 43, 159, 37, 59, 180, 13, 67, 20, 254, 160, 51, 146, 53, 176, 202, 219, 68, 199, 243, 111, 49, 150, 51, 194, 146, 226, 49, 218, 139, 96, 185, 253, 52, 52, 15, 153, 55, 122, 12, 146, 215, 47, 102, 245, 253, 83, 23, 34, 188, 72, 198, 111, 67, 176, 122, 31, 202, 51, 237, 135, 61, 33, 210, 128, 115, 211, 173, 191, 130, 134, 167, 71, 65, 233, 215, 148, 231, 52, 137, 240, 179, 190, 192, 124, 20, 83, 195, 198, 230, 114, 236, 127, 79, 201, 120, 125, 94, 38, 132, 136, 156, 127, 17, 112, 170, 68, 24, 26, 7, 133, 24, 248, 35, 24, 162, 184];
        console.log(JSON.stringify(this.p));
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