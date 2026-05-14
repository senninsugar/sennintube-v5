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
                    thumbnail: (c.authorThumbnails && c.authorThumbnails.length > 0) ? c.authorThumbnails[c.authorThumbnails.length - 1].url : "",
                    subscribers: c.subCountText || "0",
                    banner: (c.authorBanners && c.authorBanners.length > 0) ? c.authorBanners[0].url : "",
                    videos: (c.latestVideos || []).map(v => ({
                        videoId: v.videoId,
                        title: v.title,
                        videoThumbnails: v.videoThumbnails,
                        viewCountText: v.viewCountText,
                        publishedText: v.publishedText
                    })),
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
            banner: channel.header.banner?.thumbnails[0]?.url || "",
            videos: (channel.videos || []).map(v => ({
                videoId: v.id,
                title: v.title?.toString(),
                videoThumbnails: [{ url: v.thumbnail[0]?.url }],
                viewCountText: v.view_count?.toString(),
                publishedText: v.published?.toString()
            })),
            comments: [] 
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

module.exports = getChannelInfo;
