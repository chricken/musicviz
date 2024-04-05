'use strict';

import settings, { elements } from "./settings.js";
import helpers from './helpers.js';
import ajax from './ajax.js';

const renderViz = {
    dummy(data) {
        return new Promise(resolve => {

            let c = elements.c;
            let ctx = c.getContext('2d');

            settings.indexImage++;

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

            ajax.storeImage().then(
                () => requestAnimationFrame(resolve)
            )
            
        })
    },
    init(data) {
        // console.log(data);
        const iterator = data.values();

        const stepNext = () => {
            let next = iterator.next();
            // console.log(next);
            if (!next.done) {
                renderViz.dummy(next.value).then(
                    stepNext
                )
            }
        }

        stepNext();
    }
}

export default renderViz;