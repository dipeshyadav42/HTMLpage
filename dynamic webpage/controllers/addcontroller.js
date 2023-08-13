const { assign } = require('nodemailer/lib/shared')
const Add=require('../models/address')


exports.adminshow=async(req,res)=>{
    const record=await Add.findOne()
    res.render('admin/add.ejs',{record})
}

exports.addupdatepage=async(req,res)=>{
    const id=req.params.id
    const record=await Add.findById(id)
    res.render('admin/addupdateform.ejs',{record})
}

exports.addupdate=async(req,res)=>{
    const id=req.params.id
    const {add,landline,mobile,email,insta,twitter}=req.body 
    await Add.findByIdAndUpdate(id,{add:add,landline:landline,mobile:mobile,email:email,insta:insta,twitter:twitter})  
    res.redirect('/admin/add')
}