class NewsController {
    index(req, res) {
        // [GET], news
        res.render('news');
    }
    // [get] news :slug
    show(req, res) {
        res.send('News detail');
    }
}

module.exports = new NewsController();
