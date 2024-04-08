'use strict';

import settings, { elements } from "./settings.js";
import helpers from './helpers.js';
import ajax from './ajax.js';
import Particle from "./classes/Particle.js";

const renderViz = {
    sprincles(data) {
        return new Promise(resolve => {
            // console.log(data);
            let c = elements.c;
            let ctx = c.getContext('2d');

            // ctx.clearRect(0, 0, c.width, c.height);
            ctx.fillStyle = 'rgba(0,0,0,.7)';
            ctx.fillRect(0, 0, c.width, c.height);

            settings.particles.forEach(particle => {
                particle.update();
                particle.render();
            })

            console.log(data.length, data.length * settings.ausschnitt);

            data = data.slice(
                0,
                ~~(data.length * settings.ausschnitt)
            );

            console.log(data.length);

            data.forEach((val, index) => {
                for (let i = 0; i < settings.density; i++) {
                    if (Math.random() * 255 < val) {
                        settings.particles.push(new Particle({
                            y: 1,
                            x: 1 / data.length * index,
                            speed: Math.random() * .008 + .003,
                            angle: Math.PI,
                            spread: .5,
                            size: .003,
                            lifetime: Math.random() * 80 + 30,
                            targetColor: [0, 100, 50, 0]
                        }))
                    }
                }
            })

            if (settings.saveImages) {
                ajax.storeImage().then(
                    () => requestAnimationFrame(resolve)
                )
            } else {
                requestAnimationFrame(resolve)
            }
        })
    },
    rings(data) {
        return new Promise(resolve => {

            let c = elements.c;
            let ctx = c.getContext('2d');


            data = data.filter((value, index) => index % 1 == 0);

            data = data.map((val, index) => { return { val, index } })

            data.sort((a, b) => a.val - b.val);

            ctx.clearRect(0, 0, c.width, c.height);
            ctx.scale(1, .5);

            let barWidth = c.width / data.length;

            data.forEach((el) => {
                // ctx.fillStyle = `rgb(${value},${255-value},${value})`;
                ctx.lineWidth = barWidth * 1.5;

                ctx.strokeStyle = `rgb(${el.val},${el.val},${el.val})`;
                ctx.beginPath();
                ctx.arc(
                    c.width / 2,
                    c.height - el.val,
                    barWidth * el.index,
                    0,
                    2 * Math.PI
                )
                ctx.stroke();
            })
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            if (settings.saveImages) {
                ajax.storeImage().then(
                    () => requestAnimationFrame(resolve)
                )
            } else {
                requestAnimationFrame(resolve)
            }

        })
    },
    init(data) {
        data = [...data];
        data.splice(0, settings.startIndex);
        settings.indexImage = settings.startIndex;
        const iterator = data.values();

        const stepNext = () => {
            let next = iterator.next();
            if (!next.done) {
                renderViz.sprincles(next.value).then(
                    data => {
                        settings.indexImage++;
                        stepNext(data)
                    }
                )
            }
        }

        stepNext();
    }
}

export default renderViz;