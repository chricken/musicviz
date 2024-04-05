'use strict';

import express from 'express';
import opn from 'better-opn';

const server = express();

server.use(express.static('fe', {
    extensions: ['html']
}));

server.use(express.json());


server.post('/save-canvas', (req, res) => {
    const imageData = req.body.image;
    console.log(imageData);
    // Hier können Sie die Base64-Daten decodieren und als PNG-Datei speichern

    res.sendStatus(200);
});

const init = () => {
    server.listen(80, err => {
        if (err) console.log(err);
        else {
            console.log('Server läuft');
            opn('http://localhost/audio_json.html');
        }
    });
}

init();