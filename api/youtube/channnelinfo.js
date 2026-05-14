const { getYouTube } = require('../youtube');
const axios = require('axios');
const { INSTANCE } = require('../invidious');

async function getChannelInfo(channelId) {
    for (let url of INSTANCE) {
        try {
            const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
            const res = await axios.get(`${baseUrl}/channels/${channelId}`, { timeout: 4000 });
            if (res.data) {
                const c = res.data;
                return {
                    name: c.author,
                    thumbnail: c.authorThumbnails ? c.authorThumbnails[c.authorThumbnails.length - 1].url : "",
                    subscribers: c.subCountText || "",
                    banner: c.authorBanners ? c.authorBanners[0].url : "",
                    videos: c.latestVideos || [],
                    comments: c.comments || []
                };
            }
        } catch (e) {
            continue;
        }
    }

    try {
        const yt = await getYouTube();
        const channel = await yt.getChannel(channelId);
        return {
            name: channel.metadata.title,
            thumbnail: channel.metadata.thumbnail[0].url,
            subscribers: channel.header.subscribers?.toString() || "",
            banner: channel.header.banner?.[0]?.url || "",
            videos: channel.videos || [],
            comments: [] 
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

module.exports = getChannelInfo;
