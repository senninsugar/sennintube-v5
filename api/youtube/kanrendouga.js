const { getYouTube } = require('../youtube');

async function getRelated(videoId) {
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
