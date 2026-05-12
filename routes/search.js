const express = require('express');
const router = express.Router();
const { getYouTube } = require('../api/youtube');

router.get('/', async (req, res) => {
    const query = req.query.q;
    const yt = await getYouTube();
    const results = await yt.search(query);
    const videos = results.videos || results.contents || [];
    res.render('search', { videos: videos, query });
});

module.exports = router;
