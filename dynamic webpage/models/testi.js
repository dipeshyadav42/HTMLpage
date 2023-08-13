const mongoose=require('mongoose')

const testiSchema=mongoose.Schema({
    img:String,
    desc:String,
    name:String,
    status:{type:String,default:'unpublish'}
})


module.exports=mongoose.model('testi',testiSchema)