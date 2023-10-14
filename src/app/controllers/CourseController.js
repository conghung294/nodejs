const{mongooseToObject} = require('../../util/mongoose')
const Course =require('../models/Course')
class CourseController {
    
    // [get] course :slug
    show(req, res,next) {
        Course.findOne({ slug: req.params.slug })
          .then(course => {
            res.render('\courses/show',{
                course:mongooseToObject(course)
            })
          })
          .catch(next)
    }
}

module.exports = new CourseController();
