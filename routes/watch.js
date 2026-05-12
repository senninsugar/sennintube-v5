const express = require('express');
const router = express.Router();
const { getYouTube } = require('../api/youtube');
const { searchInvidious } = require('../api/invidious');

router.get('/', async (req, res) => {
    const query = req.query.q;
    let videos = [];
    
    if (!query) return res.redirect('/');

    // 1. 最優先: Invidiousで検索
    const invidiousResults = await searchInvidious(query);
    
    // Array.isArray() で配列であることを厳格にチェック
    if (invidiousResults && Array.isArray(invidiousResults) && invidiousResults.length > 0) {
        videos = invidiousResults.map(v => ({
            id: v.videoId,
            title: v.title,
            thumbnails: [{ url: v.videoThumbnails ? v.videoThumbnails[0].url : `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg` }],
            author: { name: v.author }
        }));
    } else {
        try {
            const yt = await getYouTube();
            const results = await yt.search(query);
            videos = (results && results.videos) ? results.videos : [];
        } catch (e) {
            console.error("YouTube.js Error:", e);
            videos = [];
        }
    }

    res.render('search', { videos, query });
});

module.exports = router;
