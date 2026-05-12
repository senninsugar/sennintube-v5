const express = require('express');
const router = express.Router();
const getStream = require('../api/youtube/getstream');
const getRelated = require('../api/youtube/kanrendouga');
const getComments = require('../api/youtube/comments');

router.get('/', async (req, res) => {
    const videoId = req.query.v;
    const streamUrl = await getStream(videoId);
    const related = await getRelated(videoId);
    const comments = await getComments(videoId);
    res.render('watch', { videoId, streamUrl, related, comments });
});

module.exports = router;
