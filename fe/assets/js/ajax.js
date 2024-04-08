'use strict';

import settings, { elements } from './settings.js';

const ajax = {
    loadJSON(url) {
        return fetch(url).then(
            result => result.json()
        )
    },
    storeImage() {
        // Client-Seite
        const c = elements.c
        const dataURL = c.toDataURL('image/png');

        return fetch('/save-canvas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imgNum: settings.indexImage,
                image: dataURL
            })
        })
    }
}

export default ajax