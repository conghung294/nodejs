const{mutipleMongooseToObject} = require('../../util/mongoose')
const Course =require('../models/Course')
class MeController {
    
   
    storedCourses(req,res,next){
        Course.find({})
          .then(courses=>{
            res.render('me/stored_Courses',{
                courses:mutipleMongooseToObject(courses)
            })
          })
          .catch(next)
    }
}

module.exports = new MeController();
