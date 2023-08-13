const mongoose=require('mongoose')

const addressSchema=mongoose.Schema({
    add:String,
    landline:String,
    mobile:String,
    email:String,
    insta:String,
    twitter:String
})



module.exports=mongoose.model('address',addressSchema)