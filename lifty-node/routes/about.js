/**
 * This endpoint is used to populate the app's about page.
 */

const express = require('express');
const router = express.Router();
const https = require('https');
const metascraper = require('metascraper')([require('metascraper-image')()]);

const about = require('../about.json');

router.get('/', async (req, res) => {
    let out = [...about];

    for (let i = 0; i < out.length; i++) {
        let data = await resolveImage(out[i].url);
        out[i].imageUrl = data.image;
    }

    res.send(out);
});

const resolveImage = async (url) =>
    new Promise(resolve => {
        https.get(url, response => {
            let html = '';

            response.on('data', (data) => {
                html += data.toString();
            });

            response.on('end', () => {
                metascraper({ html, url }).then(resolve);
            });
        });
    });

module.exports = router;
