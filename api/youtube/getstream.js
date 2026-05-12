const { getYouTube } = require('../youtube');

async function getStream(videoId) {
    const yt = await getYouTube();
    const info = await yt.getBasicInfo(videoId);
    return info.streaming_data?.formats[0]?.url || info.streaming_data?.adaptive_formats[0]?.url;
}

module.exports = getStream;
