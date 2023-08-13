const Query=require('../models/query')
const nodemailer=require('nodemailer')

exports.insert=(req,res)=>{
    const {email,query}=req.body
    const record=new Query({email:email,query:query})
    record.save()
    res.redirect('/')
}

exports.showquery=async(req,res)=>{
    const record=await Query.find()
   res.render('admin/query.ejs',{record}) 
}
exports.queryform=async(req,res)=>{
    const id=req.params.id
    const record=await Query.findById(id)
    res.render('admin/queryform.ejs',{record})
}

exports.emailsend=async(req,res)=>{
  const filepath=req.file.path 
  const id=req.params.id
    const {emailto,emailfrom,subject,body}=req.body
    const testAccount=await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'grasscoaching@gmail.com',
          pass: 'mttsxrvxixazlxpq'
        }
      });
      console.log("Connected to smtp server")
      const info = await transporter.sendMail({
        from: emailfrom, // sender address
        to: emailto, // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        //html: "<b>Hello world?</b>", // html body
        attachments:[{path:filepath}]
      });
      console.log("email send")
      await Query.findByIdAndUpdate(id,{status:'Replied'})
      res.redirect('/admin/query')
    
}