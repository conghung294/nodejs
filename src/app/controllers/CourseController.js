const{mongooseToObject} = require('../../util/mongoose')
const Course =require('../models/Course')
class CourseController {
    
    // [get] course :slug
    show(req, res,next) {
        Course.findOne({ slug: req.params.slug })
          .then(course => {
            res.render('courses/show',{
                course:mongooseToObject(course)
            })
          })
          .catch(next)
    }
    create(req,res,next){
      res.render('courses/create')
    }
    store(req,res,next){
     
      const course = new Course(req.body)
      course.save()
        .then(()=>res.redirect('/me/stored/courses'))
        .catch(next)
    }
    edit(req,res,next){
      Course.findById(req.params.id)
      .then(
        course=>{
          res.render('courses/edit',{
            course:mongooseToObject(course)
          })
        }
      )
    }
    update(req,res,next){
      Course.updateOne({_id:req.params.id},req.body)
      .then(()=>res.redirect('/me/stored/courses'))
        .catch(next)
    }

    delete(req,res,next){
      Course.delete({_id:req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)
    }

    forceDelete(req,res,next){
      Course.deleteOne({_id:req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)
    }

    restore(req,res,next){
      Course.restore({_id:req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)
    }
    handleFormActions(req,res,next){
      switch(req.body.action){
        case 'delete':
          Course.delete({_id:{$in:req.body.courseIds}})
      .then(() => res.redirect('back'))
      .catch(next)
        break;
        default:
        res.json({message:'action is error'})
      }
      
    }
    
}

module.exports = new CourseController();
