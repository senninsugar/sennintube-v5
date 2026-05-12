const axios = require('axios');
const INSTANCE = [
    "https://iv.ggtyler.dev/api/v1",
    'https://inv.nadeko.net/api/v1',
    'https://invidious.f5.si/api/v1',
    'https://invidious.ritoge.com/api/v1',
    'https://invidious.ducks.party/api/v1',
    'https://super8.absturztau.be/api/v1',
    'https://invidious.darkness.services/api/v1',
    'https://yt.omada.cafe/api/v1',
    'https://iv.melmac.space/api/v1',
    'https://iv.duti.dev/api/v1',
];

async function fetchInvidious(endpoint) {
    for (let url of INSTANCE) {
        try {
            const res = await axios.get(`${url}${endpoint}`, { timeout: 5000 });
            return res.data;
        } catch (e) {
            continue;
        }
    }
    return null;
}

async function getTrending() {
    return await fetchInvidious('/trending');
}

async function searchInvidious(query) {
    return await fetchInvidious(`/search?q=${encodeURIComponent(query)}`);
}

module.exports = { getTrending, searchInvidious, INSTANCE };
