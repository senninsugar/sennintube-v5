const { getYouTube } = require('../youtube');

async function getChannelInfo(channelId) {
    const yt = await getYouTube();
    const channel = await yt.getChannel(channelId);
    return {
        name: channel.metadata.title,
        thumbnail: channel.metadata.thumbnail[0].url,
        subscribers: channel.header.subscribers?.toString() || ""
    };
}

module.exports = getChannelInfo;
