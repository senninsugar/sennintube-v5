const { getYouTube } = require('../youtube');
const axios = require('axios');
const { INSTANCE } = require('../invidious');

async function getStream(videoId) {
    for (let url of INSTANCE) {
        try {
            const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
            const res = await axios.get(`${baseUrl}/videos/${videoId}`, { timeout: 3000 });
            if (res.data && res.data.formatStreams) {
                return res.data.formatStreams[0].url;
            }
        } catch (e) {
            continue;
        }
    }
    const yt = await getYouTube();
    const info = await yt.getBasicInfo(videoId);
    return info.streaming_data?.formats[0]?.url || info.streaming_data?.adaptive_formats[0]?.url;
}

module.exports = getStream;
