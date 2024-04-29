'use strict';

import settings, { elements } from "./settings.js";
import helpers from './helpers.js';
import ajax from './ajax.js';
import Particle from "./classes/Particle.js";
import WaveRing from './classes/WaveRing.js';
// import Line from './classes/Line.js';


const renderViz = {
    kurve(data) {
        return new Promise(resolve => {
            // debugger
            let c = elements.c;
            let ctx = c.getContext('2d');

            ctx.clearRect(0, 0, c.width, c.height);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;

            // Ausschnitt
            let myDataset = [];
            for (let i = 0; i < 1; i += settings.density) {
                myDataset.push(data[~~(data.length * i)] / 255)
            }
            data = myDataset;

            settings.lines.push(new Line(data));

            settings.lines.forEach(line => {
                line.update();
                line.render();
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
    heightmap(data) {
        let c = elements.c;
        let ctx = c.getContext('2d');

        ctx.clearRect(0, 0, c.width, c.height);

        // Ausschnitt
        data = data.map(dataset =>
            dataset.slice(0, settings.ausschnitt)
                .map(val => (val - settings.minLevel))
                .map(val => Math.max(val, 0))
        )

        c.width = data[0].length;
        c.height = data.length;

        const imgData = ctx.createImageData(c.width, c.height);

        data.forEach((dataset, y) => {
            dataset.forEach((val, x) => {
                // debugger
                let i = y * c.width + x;
                i *= 4;
                imgData.data[i + 0] = val;
                imgData.data[i + 1] = val;
                imgData.data[i + 2] = val;
                imgData.data[i + 3] = 255;
            })
        })

        ctx.putImageData(imgData, 0, 0);

        if (settings.saveImages) {
            ajax.storeImage().then(
                () => console.log('Fertig')
            )
        }
    },
    imgDispersion(data) {
        return new Promise(resolve => {
            let c = elements.c;
            let ctx = c.getContext('2d');
            let ctx2 = elements.cImg.getContext('2d');

            // Partikel zeichnen
            ctx.clearRect(0, 0, c.width, c.height);

            data = data
                .slice(0, settings.ausschnitt)
                .map(val => (val - settings.minLevel))
                .map(val => Math.max(val, 0))

            // let avg = data.reduce((prev, sum) => prev + sum, 0) / data.length * settings.amp;
            // Verschiebung auf Basis von Channel 4
            let avg = data[200] * settings.amp;

            // console.log(avg);

            let imgData1 = ctx.getImageData(0, 0, c.width, c.height);
            let imgData2 = ctx2.getImageData(0, 0, elements.cImg.width, elements.cImg.height);

            // console.log(imgData1);
            // console.log(imgData2);
            for (let i = 0; i < imgData1.data.length; i += 4) {
                let x = (i / 4) % imgData1.width;
                let y = Math.floor((i / 4) / imgData1.width);

                // x += helpers.createNumber(-avg / 2, avg / 2);
                y += helpers.createNumber(-avg / 2, avg / 2);
                x = Math.min(Math.max(0, x), imgData1.width);
                y = Math.min(Math.max(0, y), imgData1.height);

                let j = y * imgData1.width + x;
                j *= 4;

                // console.log(x,y,i);

                imgData1.data[i + 0] = imgData2.data[j + 0] + ~~(avg * settings.amp)
                imgData1.data[i + 1] = imgData2.data[j + 1] + ~~(avg * settings.amp)
                imgData1.data[i + 2] = imgData2.data[j + 2] + ~~(avg * settings.amp)
                imgData1.data[i + 3] = 255;
                // debugger
            }

            ctx.putImageData(imgData1, 0, 0);

            if (settings.saveImages) {
                ajax.storeImage().then(
                    () => requestAnimationFrame(resolve)
                )
            } else {
                requestAnimationFrame(resolve)
            }
        })
    },
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
    initVizImage() {
        // Initialisierung des Bildes, das für die Visualisierung als Vorlage dient
        elements.cImg = document.createElement('canvas');
        elements.cImg.width = elements.c.width;
        elements.cImg.height = elements.c.height;
        document.body.append(elements.cImg);
        let ctx = elements.cImg.getContext('2d');

        let w = elements.vizImg.naturalWidth;
        let h = elements.vizImg.naturalHeight;

        let imgProp = w / h;
        let cProp = elements.cImg.width / elements.cImg.height;

        if (imgProp > cProp) {
            ctx.drawImage(elements.vizImg,
                0, 0,
                elements.cImg.width * imgProp / cProp,
                elements.cImg.height
            );
        } else {
            ctx.drawImage(elements.vizImg,
                0, 0,
                elements.cImg.width,
                elements.cImg.height * imgProp / cProp,
            );

        }

    },
    init(data) {
        // debugger
        settings.numDataSets = data.length;
        data = [...data];
        // data.splice(0, settings.startIndex);
        data.slice(0, 100);
        settings.indexImage = settings.startIndex;

        //  renderViz.heightmap(data);

        renderViz.initVizImage();

        const iterator = data.values();

        const stepNext = () => {
            let next = iterator.next();
            if (!next.done) {
                renderViz.imgDispersion(next.value).then(
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