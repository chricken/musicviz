'use strict';
import settings, { elements } from './settings.js'

const render = {
    spectrum(spectrum) {
        let c = elements.c;
        let ctx = elements.c.getContext('2d');

        ctx.clearRect(0, 0, c.width, c.height);

        // Calculate the width of each bar in the spectrum
        const barWidth = (c.width + settings.padding) / settings.bufferLength;

        // Iterate through the data array and draw the bars
        for (let i = 0; i < settings.bufferLength; i++) {
            const barHeight = settings.dataArray[i] * (c.height / 255);

            // Draw the bar
            ctx.fillStyle = '#fff';
            ctx.fillRect(
                i * barWidth,
                c.height - barHeight,
                barWidth - settings.padding,
                barHeight
            );
        }
    },
    lines(spectrum) {

        // Spektrum vereinfachen
        spectrum = spectrum.filter((val, i) => i % settings.everyNthValue == 0);

        // console.log(spectrum);

        let c = elements.c;
        let ctx = c.getContext('2d');

        ctx.clearRect(0, 0, c.width, c.height);

        // Calculate the width of each bar in the spectrum
        const barWidth = (c.width + settings.padding) / spectrum.length;
        console.log(spectrum);

        for (let i = 0; i < settings.numIterations; i++) {
            let rndColor = Math.random() * settings.visibility;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${rndColor})`;
            // Iterate through the data array and draw the bars
            spectrum.forEach((bar, index) => {

                const barHeight = bar * (c.height);

                // Draw the bar
                let distress = Math.random() * settings.distress - (settings.distress / 2);

                ctx.lineTo(
                    index * barWidth,
                    c.height + barHeight + distress,
                )
                console.log(index * barWidth,
                    c.height + barHeight + distress,);
            })
            ctx.stroke();
        }
    }
}

export default render;