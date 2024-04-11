'use strict';

import settings, { elements } from "./settings.js";
import helpers from './helpers.js';
import ajax from './ajax.js';
import Particle from "./classes/Particle.js";
import WaveRing from './classes/WaveRing.js'

const renderViz = {
    waveRings(data) {
        return new Promise(resolve => {
            let c = elements.c;
            let ctx = c.getContext('2d');

            // Partikel zeichnen
            ctx.clearRect(0, 0, c.width, c.height);
            console.log(data.length);
            settings.ringWaves.push(
                new WaveRing({
                    data,
                    // addTranslate: [...settings.addTranslate],
                })
            )
            // settings.addTranslate[0] += settings.addAddTranslate[0];
            // settings.addTranslate[1] += settings.addAddTranslate[1];

            settings.ringWaves.toReversed().forEach(ring => {
                ring.update();
                ring.render();
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
    sprincles(data) {
        return new Promise(resolve => {
            // console.log(data);
            let c = elements.c;
            let ctx = c.getContext('2d');

            // Partikel zeichnen
            ctx.clearRect(0, 0, c.width, c.height);

            settings.particles.forEach(particle => {
                particle.render();
                particle.update();
            })

            // Naue Partikel erzeugen
            data = data.slice(
                0,
                ~~(data.length * settings.ausschnitt)
            );

            data.forEach((val, index) => {
                for (let j = 0; j < val * settings.density; j++) {
                    if ((Math.random() ** .3) * 255 < val) {
                        settings.particles.push(new Particle({
                            y: Math.random() * .01 + 1,
                            x: 1 / data.length * index,
                            speed: Math.random() * .003 + .015,
                            angle: Math.PI,
                            spread: .02,
                            size: .002,
                            lifetime: Math.random() * 20 + 20,
                            startColor: [val, 255 - (255 / data.length * index), 128, 1],
                            targetColor: [255, 0, 0, 0],
                        }))
                    }
                }
            })
            // console.log(elements);
            elements.debug.innerHTML = '';
            elements.debug.innerHTML += settings.particles.length + ' Partikel<br />';
            elements.debug.innerHTML += settings.indexImage + ' (Index)<br />';

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
                renderViz.waveRings(next.value).then(
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