const axios = require('axios');

async function getEduUrl(req, res) {
    const videoId = req.query.v;
    const configUrl = 'https://raw.githubusercontent.com/siawaseok3/wakame/master/video_config.json';

    try {
        const configRes = await axios.get(configUrl);
        const params = configRes.data.Params || "";
        const formattedParams = params.startsWith('?') ? params : `?${params}`;
        
        const eduUrl = `https://www.youtubeeducation.com/embed/${videoId}${formattedParams}`;
        
        res.json({ url: eduUrl });
    } catch (e) {
        res.json({ url: `https://www.youtubeeducation.com/embed/${videoId}?autoplay=1` });
    }
}

module.exports = getEduUrl;
