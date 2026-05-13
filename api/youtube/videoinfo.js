const { getYouTube } = require('../youtube');
const axios = require('axios');
const { INSTANCE } = require('../invidious');

async function getVideoInfo(videoId) {
    for (let url of INSTANCE) {
        try {
            const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
            const res = await axios.get(`${baseUrl}/videos/${videoId}`, { timeout: 3000 });
            if (res.data) {
                const v = res.data;
                return {
                    title: v.title,
                    viewCount: v.viewCount,
                    author: v.author,
                    authorId: v.authorId,
                    authorThumb: v.authorThumbnails ? v.authorThumbnails[0].url : "",
                    likeCount: v.likeCount ? v.likeCount.toLocaleString() : "非公開",
                    channelName: v.author,
                    channelThumb: v.authorThumbnails ? v.authorThumbnails[0].url : "",
                    subscriberCount: v.subCountText || ""
                };
            }
        } catch (e) {
            continue;
        }
    }

    try {
        const yt = await getYouTube();
        const info = await yt.getBasicInfo(videoId);
        const section = await yt.getInfo(videoId);

        return {
            title: info.basic_info.title,
            viewCount: info.basic_info.view_count,
            author: info.basic_info.author,
            authorId: info.basic_info.channel_id,
            authorThumb: info.basic_info.thumbnail[0].url,
            likeCount: section.primary_info?.short_view_count?.toString() || "非公開",
            channelName: section.secondary_info?.owner?.name?.toString(),
            channelThumb: section.secondary_info?.owner?.thumbnails[0]?.url,
            subscriberCount: section.secondary_info?.owner?.subscriber_count?.toString() || ""
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

module.exports = getVideoInfo;
