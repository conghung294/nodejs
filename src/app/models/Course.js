const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type:String,required:true},
    description: {type:String,maxLength:255},
    image: {type:String,maxLength:255},
    videoiD:{type:String,maxLength:255},
    slug: { type: String, slug: "name" , unique:true}
},
{
    timestamps:true
}
)

module.exports= mongoose.model('Course',Course)