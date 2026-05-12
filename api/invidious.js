const axios = require('axios');
const INSTANCE = [
    "https://iv.ggtyler.dev/api/v1",
    'https://inv.nadeko.net/',
    'https://invidious.f5.si/',
    'https://invidious.ritoge.com/',
    'https://invidious.ducks.party/',
    'https://super8.absturztau.be/',
    'https://invidious.darkness.services/',
    'https://yt.omada.cafe/',
    'https://iv.melmac.space/',
    'https://iv.duti.dev/',
]

async function getTrending() {
    const res = await axios.get(`${INSTANCE}/trending`);
    return res.data;
}

module.exports = { getTrending };
