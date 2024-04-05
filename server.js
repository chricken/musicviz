'use strict';

import express from 'express';
import opn from 'better-opn';

const server = express();

server.use(express.static('fe', {
    extensions: ['html']
}));

const init = () => {
    server.listen(80, err => {
        if (err) console.log(err);
        else {
            console.log('Server läuft');
            opn('http://localhost');
        }
    });
}

init();