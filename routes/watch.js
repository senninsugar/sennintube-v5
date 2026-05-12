const express = require('express');
const router = express.Router();
const { getYouTube } = require('../api/youtube');
const { searchInvidious } = require('../api/invidious');

router.get('/', async (req, res) => {
    const query = req.query.q;
    let videos = [];

    // 検索ワードがない場合はホームへ戻す
    if (!query) {
        return res.redirect('/');
    }

    try {
        // 1. 最優先: Invidiousで検索を試みる
        const invidiousResults = await searchInvidious(query);
        
        // invidiousResults が存在し、かつ「配列」であることを厳格に確認
        if (invidiousResults && Array.isArray(invidiousResults)) {
            videos = invidiousResults.map(v => ({
                id: v.videoId,
                title: v.title,
                thumbnails: [{ 
                    url: v.videoThumbnails ? v.videoThumbnails[0].url : `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg` 
                }],
                author: { name: v.author }
            }));
        } else {
            // 配列ではなかった（エラーや空レスポンス）場合はエラーを投げて catch 節へ移動
            throw new Error('Invidious API returned non-array data');
        }
    } catch (e) {
        // 2. Invidiousが失敗した場合のバックアップ: youtubei.js を使用
        try {
            const yt = await getYouTube();
            const results = await yt.search(query);
            // youtubei.js の結果も念のため配列チェックを行う
            videos = (results && results.videos && Array.isArray(results.videos)) ? results.videos : [];
        } catch (ytError) {
            console.error("Backup YouTube Search Error:", ytError);
            videos = [];
        }
    }

    // 最終的に取得した videos で描画（空でも 502 エラーにはなりません）
    res.render('search', { videos, query });
});

module.exports = router;
