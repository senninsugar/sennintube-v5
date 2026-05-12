const { Innertube } = require('youtubei.js');
let youtube;

async function getYouTube() {
    if (!youtube) {
        youtube = await Innertube.create();
    }
    return youtube;
}

module.exports = { getYouTube };
