const Reg=require('../models/reg')

exports.adminloginpage=(req,res)=>{
    res.render('admin/login.ejs')
}

exports.adminlogincheck=async(req,res)=>{
    const {us,pass}=req.body
    const record=await Reg.findOne({username:us})
    //console.log(record)
    if(record!==null){
        if(record.password==pass){
            req.session.isAuth=true
        res.redirect('/admin/dashboard')
    }else{
        res.redirect('/admin/')
    }
    }else{
        res.redirect('/admin/')
    }
}


exports.dashboard=(req,res)=>{
    res.render('admin/dashboard.ejs')
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin/')
}