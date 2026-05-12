const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://suggestqueries.google.com/complete/search?client=firefox&hl=ja&q=${encodeURIComponent(query)}`);
        res.json(response.data[1]);
    } catch (e) {
        res.json([]);
    }
});

module.exports = router;
