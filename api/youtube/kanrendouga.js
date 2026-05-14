const { getYouTube } = require('../youtube');
const axios = require('axios');
const { INSTANCE } = require('../invidious');

async function getRelated(videoId) {
    for (let url of INSTANCE) {
        try {
            const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
            const res = await axios.get(`${baseUrl}/videos/${videoId}`, { timeout: 3000 });
            if (res.data && res.data.recommendedVideos) {
                return res.data.recommendedVideos.map(v => ({
                    id: v.videoId,
                    title: v.title,
                    author: v.author,
                    thumbnail: `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`
                }));
            }
        } catch (e) {
            continue;
        }
    }
    const yt = await getYouTube();
    const info = await yt.getInfo(videoId);
    return info.watch_next_feed.map(v => ({
        id: v.id,
        title: v.title.toString(),
        author: v.author.name,
        thumbnail: v.thumbnails[0].url
    }));
}

module.exports = getRelated;
