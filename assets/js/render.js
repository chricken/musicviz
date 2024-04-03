'use strict';
import settings, { elements } from './settings.js'

const render = {
    spectrum() {
        let c = elements.c;
        let ctx = elements.ctx;
        // Draw function to visualize the spectrum
        // Request animation frame for smooth rendering
        requestAnimationFrame(render.spectrum);

        // Get the audio data and draw the spectrum
        settings.analyser.getByteFrequencyData(settings.dataArray);

        // Clear the canvas for new frames
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
    lines() {
        let c = elements.c;
        let ctx = elements.ctx;
        // Draw function to visualize the spectrum
        // Request animation frame for smooth rendering
        requestAnimationFrame(render.lines);

        // Get the audio data and draw the spectrum
        settings.analyser.getByteFrequencyData(settings.dataArray);

        // Clear the canvas for new frames
        ctx.clearRect(0, 0, c.width, c.height);

        // Calculate the width of each bar in the spectrum
        const barWidth = (c.width + settings.padding) / settings.bufferLength;


        for (let i = 0; i < settings.numIterations; i++) {
            let rndColor = Math.random() * settings.visibility;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${rndColor})`;
            // Iterate through the data array and draw the bars
            for (let i = 0; i < settings.bufferLength; i += 2) {

                const barHeight = settings.dataArray[i] * (c.height / 255);
                const barHeight2 = settings.dataArray[i + 1] * (c.height / 255);

                // Draw the bar
                let distress = Math.random() * settings.distress - (settings.distress / 2);
              
                ctx.quadraticCurveTo(
                    i * barWidth,
                    c.height - barHeight + distress,
                    (i + 1) * barWidth,
                    c.height - barHeight2 + distress,
                )
            }
            ctx.stroke();
        }
    }
}

export default render;