const { getYouTube } = require('../youtube');
const axios = require('axios');
const { INSTANCE } = require('../invidious');

async function getComments(videoId) {
    for (let url of INSTANCE) {
        try {
            const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
            const res = await axios.get(`${baseUrl}/comments/${videoId}`, { timeout: 3000 });
            if (res.data && res.data.comments) {
                return res.data.comments.map(c => ({
                    author: c.author,
                    text: c.content,
                    authorThumb: c.authorThumbnails[0].url
                }));
            }
        } catch (e) {
            continue;
        }
    }
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
