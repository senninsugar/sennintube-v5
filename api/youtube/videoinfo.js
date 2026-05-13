const { getYouTube } = require('../youtube');

async function getVideoInfo(videoId) {
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
