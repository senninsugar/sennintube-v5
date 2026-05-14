const { getYouTube } = require('../youtube');
const axios = require('axios');
const { INSTANCE } = require('../invidious');

async function getVideoInfo(videoId) {
    for (let url of INSTANCE) {
        try {
            const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
            const res = await axios.get(`${baseUrl}/videos/${videoId}`, { timeout: 3000 });
            
            if (res.data && res.data.title) {
                const v = res.data;
                // サムネイルの安全な取得
                const thumb = v.authorThumbnails && v.authorThumbnails.length > 0 
                    ? v.authorThumbnails[0].url 
                    : "https://ui-avatars.com/api/?name=" + encodeURIComponent(v.author || "U");

                return {
                    title: v.title || "無題の動画",
                    viewCount: v.viewCount || 0,
                    author: v.author || "不明なチャンネル",
                    authorId: v.authorId || "",
                    authorThumb: thumb,
                    likeCount: v.likeCount ? v.likeCount.toLocaleString() : "非公開",
                    channelName: v.author || "不明なチャンネル",
                    channelThumb: thumb,
                    subscriberCount: v.subCountText || ""
                };
            }
        } catch (e) {
            continue;
        }
    }

    // Invidiousが全滅した場合のフォールバック
    try {
        const yt = await getYouTube();
        const info = await yt.getBasicInfo(videoId);
        const section = await yt.getInfo(videoId);

        return {
            title: info.basic_info.title || "取得エラー",
            viewCount: info.basic_info.view_count || 0,
            author: info.basic_info.author || "不明",
            authorId: info.basic_info.channel_id || "",
            authorThumb: info.basic_info.thumbnail?.[0]?.url || "",
            likeCount: section.primary_info?.short_view_count?.toString() || "非公開",
            channelName: section.secondary_info?.owner?.name?.toString() || info.basic_info.author,
            channelThumb: section.secondary_info?.owner?.thumbnails?.[0]?.url || "",
            subscriberCount: section.secondary_info?.owner?.subscriber_count?.toString() || ""
        };
    } catch (e) {
        console.error("Video Info Error:", e);
        // 最低限タイトルだけでも表示させるためのダミーデータ
        return {
            title: "動画情報を取得できませんでした",
            viewCount: 0,
            author: "Error",
            authorId: "",
            authorThumb: "",
            likeCount: "非公開",
            channelName: "Error",
            channelThumb: "",
            subscriberCount: ""
        };
    }
}

module.exports = getVideoInfo;
