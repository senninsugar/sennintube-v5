const { getYouTube } = require('../youtube');

async function getComments(videoId) {
    const yt = await getYouTube();
    try {
        const comments = await yt.getComments(videoId);
        return comments.contents.map(c => ({
            author: c.author.name,
            text: c.content.toString(),
            authorThumb: c.author.thumbnails[0].url
        }));
    } catch (e) {
        return [];
    }
}

module.exports = getComments;
