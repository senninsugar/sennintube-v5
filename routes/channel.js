const express = require('express');
const router = express.Router();
const getChannelInfo = require('../api/youtube/channelinfo');

router.get('/:id', async (req, res) => {
    const channelId = req.params.id;
    const channelInfo = await getChannelInfo(channelId);
    if (!channelInfo) return res.status(404).send('Channel Not Found');
    res.render('channel', { channelInfo });
});

module.exports = router;
