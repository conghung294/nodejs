const{mutipleMongooseToObject} = require('../../util/mongoose')
const Course =require('../models/Course')
class MeController {
    
   
    storedCourses(req,res,next){
      let coursequery = Course.find({})
      if(req.query.hasOwnProperty('_sort')){
        coursequery = coursequery.sort({
          [req.query.column]:req.query.type
        })
      }
      Promise.all([coursequery,Course.findDeleted({})])
      .then(([courses,coursesDeleted])=>{
        res.render('me/stored_Courses',{
             countDeleted: coursesDeleted.filter(coursesDeleted => coursesDeleted.deleted).length ,
            courses: mutipleMongooseToObject(courses)
      })
    })
      
      .catch(next)
    }

    trashCourses(req,res,next){
      Course.findWithDeleted({ deleted: true })
      .then(courses=>{
        res.render('me/trash_Courses',{
            courses:mutipleMongooseToObject(courses)
        })
      })
      .catch(next)
    }
}


module.exports = new MeController();
