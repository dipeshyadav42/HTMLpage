const Testi=require('../models/testi')


exports.testishow=async(req,res)=>{
    const record=await Testi.find()
    res.render('admin/testi.ejs',{record})
}
exports.testiadd=(req,res)=>{
    res.render('admin/testiaddform.ejs')
}
exports.testiinsert=(req,res)=>{
    const filename=req.file.filename
    const {tdesc,tname}=req.body
    const record=new Testi({img:filename,desc:tdesc,name:tname})
    record.save()
    //console.log(record)
    res.redirect('/admin/testi')
}

exports.testistatusupdate=async(req,res)=>{
    const id=req.params.id
    const record=await Testi.findById(id)
    let newstatus=null
    if(record.status=='unpublish'){
        newstatus='publish'
    }else{
        newstatus='unpublish'
    }
    await Testi.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/testi')
}

exports.delete=async(req,res)=>{
    const id=req.params.id
    await Testi.findByIdAndDelete(id)
    res.redirect('/admin/testi')
}