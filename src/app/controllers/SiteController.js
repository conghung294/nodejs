const{mutipleMongooseToObject}= require('../../util/mongoose')
const Course =require('../models/Course')
class SiteController {
    index(req, res,next) {
        // [GET], news
        // res.render('home');
        Course.find({}) 
        .then(courses => {
            res.render('home',{ 
                courses: mutipleMongooseToObject(courses)
            })
        }) 
        .catch(next);
        
    }
    // [get] search :slug
    search(req, res) {
        res.send('Search detail');
    }
}

module.exports = new SiteController();
