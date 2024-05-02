'use strict';

import express from 'express';
import opn from 'better-opn';
import chalk from 'chalk';
import fs from 'fs';

let path = 'C:/temp px/music visualisations/sappalot/dispersion';

const server = express();

server.use(express.static('fe', {
    extensions: ['html']
}));

server.use(express.json({ limit: '50mb' }));

server.post('/save-canvas', (req, res) => {
    const imageData = req.body;
    // console.log(imageData.imgNum, imageData.image.substr(0, 50));

    // Hier können Sie die Base64-Daten decodieren und als PNG-Datei speichern
    const base64Data = imageData.image.replace(/^data:image\/png;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');

    // Datei speichern
    fs.writeFile(`${path}/image_${leading0(imageData.imgNum)}.png`, binaryData, 'binary', (err) => {
        if (err) {
            console.error(`Fehler beim Speichern des Bildes ${chalk.red.bold(imageData.imgNum)}: `, err);
            res.sendStatus(500);
        } else {
            console.log(`Bild ${chalk.green.bold(leading0(imageData.imgNum))} erfolgreich gespeichert.`);
            res.sendStatus(200);
        }
    });

});

// FUNKTIONEN
const leading0 = (num, dec = 4) => ('000000000000' + num).substr(-dec);


const init = () => {
    server.listen(80, err => {
        if (err) console.log(err);
        else {
            console.log('Server läuft');
            // opn('http://localhost/audio_json.html');
            opn('http://localhost/index.html');
        }
    });
}

init();