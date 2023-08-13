const Services=require('../models/services')
const Add=require('../models/address')


exports.serviceshow=async(req,res)=>{
    const record=await Services.find().sort({postedDate:-1})
    const totalcount=await Services.count()
    const publishcount=await Services.count({status:'Published'})
    const unpublishcount=await Services.count({status:'Unpublished'})
    res.render('admin/service.ejs',{record,totalcount,publishcount,unpublishcount})
}

exports.serviceadd=(req,res)=>{
    res.render('admin/serviceaddform.ejs')
}

exports.serviceinsert=(req,res)=>{
    const filename=req.file.filename
    const {sname,sdesc,sldesc}=req.body
    const record=new Services({name:sname,desc:sdesc,ldesc:sldesc,img:filename})
    record.save()
    //console.log(record)
    res.redirect('/admin/services')
}

exports.servicestatusupdate=async(req,res)=>{
    const id=req.params.id
    const record=await Services.findById(id)
    let newstatus=null
    if(record.status=='Unpublished'){
        newstatus='Published'
    }else{
        newstatus='Unpublished'
    }
    await Services.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/services')
}

exports.servicedetails=async(req,res)=>{
    const id=req.params.id
    const record=await Services.findById(id)
    const AddressRecord=await Add.findOne()
    res.render('service.ejs',{record,AddressRecord})
}

exports.delete=async(req,res)=>{
    const id=req.params.id
    await Services.findByIdAndDelete(id)
    res.redirect('/admin/services')
}

exports.search=async(req,res)=>{
    const{search}=req.body
    const record=await Services.find({status:search})
    const totalcount=await Services.count()
    const publishcount=await Services.count({status:'Published'})
    const unpublishcount=await Services.count({status:'Unpublished'})
    res.render('admin/service.ejs',{record,totalcount,publishcount,unpublishcount})
}