const express = require('express');
const router = express.Router();
const { getYouTube } = require('../api/youtube');

router.get('/', async (req, res) => {
    const query = req.query.q;
    const yt = await getYouTube();
    const results = await yt.search(query);
    res.render('search', { videos: results.videos, query });
});

module.exports = router;
