const express = require('express');
const router = express.Router();
const { getYouTube } = require('../api/youtube');
const { searchInvidious } = require('../api/invidious');

router.get('/', async (req, res) => {
    const query = req.query.q;
    let videos = [];

    // 1. 最優先: Invidiousで検索
    const invidiousResults = await searchInvidious(query);
    
    if (invidiousResults && invidiousResults.length > 0) {
        videos = invidiousResults.map(v => ({
            id: v.videoId,
            title: v.title,
            thumbnails: [{ url: v.videoThumbnails ? v.videoThumbnails[0].url : `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg` }],
            author: { name: v.author }
        }));
    } else {
        // 2. 失敗した場合: youtubei.js (getYouTube) を使用
        try {
            const yt = await getYouTube();
            const results = await yt.search(query);
            videos = results.videos;
        } catch (e) {
            videos = [];
        }
    }

    res.render('search', { videos, query });
});

module.exports = router;
