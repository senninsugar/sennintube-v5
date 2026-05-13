const express = require('express');
const router = express.Router();
const getStream = require('../api/youtube/getstream');
const getRelated = require('../api/youtube/kanrendouga');
const getComments = require('../api/youtube/comments');
const getVideoInfo = require('../api/youtube/videoinfo');
const getEduUrl = require('../api/youtube/edu');

router.get('/', async (req, res) => {
    const videoId = req.query.v;
    const streamUrl = await getStream(videoId);
    const related = await getRelated(videoId);
    const comments = await getComments(videoId);
    const videoInfo = await getVideoInfo(videoId);
    res.render('watch', { videoId, streamUrl, related, comments, videoInfo });
});

router.get('/api/youtube/edu', getEduUrl);

module.exports = router;
