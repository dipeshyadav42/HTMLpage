const banner=require('../models/banner')
const Add=require('../models/address')



exports.bannershow=async(req,res)=>{
    const record=await banner.findOne()
    res.render('admin/banner.ejs',{record})
}

exports.bannerupdatepage=async(req,res)=>{
    const id=req.params.id
    const record=await banner.findById(id)
    res.render('admin/bannerform.ejs',{record})
}

exports.bannerupdate=async(req,res)=>{
    const id=req.params.id
    const {title,desc,ldesc}=req.body
    if(req.file){
    const filename=req.file.filename
    await banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc,img:filename})
    }else{
        await banner.findByIdAndUpdate(id,{title:title,desc:desc,ldesc:ldesc})
    }
    res.redirect('/admin/banner')
}
    
exports.banner=async(req,res)=>{
    const record=await banner.findOne()
    const AddressRecord=await Add.findOne()
    res.render('banner.ejs',{record,AddressRecord})
}