const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testicontroller')
const queryc=require('../controllers/querycontroller')
const addc=require('../controllers/addcontroller')
const multer=require('multer')
const Address=require('../models/address')

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})


router.get('/',regc.adminloginpage)
router.post('/adminrecord',regc.adminlogincheck)
router.get('/dashboard',regc.dashboard)
router.get('/logout',regc.logout)
router.get('/banner',bannerc.bannershow)
router.get('/bannerupdate/:id',bannerc.bannerupdatepage) 
router.post('/updaterecords/:id',upload.single('img'),bannerc.bannerupdate)
router.get('/services',servicec.serviceshow)
router.get('/serviceadd',servicec.serviceadd)
router.post('/serviceaddrecords',upload.single('img'),servicec.serviceinsert)
router.get('/servicestatusupdate/:id',servicec.servicestatusupdate)
router.get('/servicedelete/:id',servicec.delete)
router.post('/servicesearch',servicec.search)
router.get('/testi',testic.testishow)
router.get('/testiadd',testic.testiadd)
router.post('/testiaddrecord',upload.single('timg'),testic.testiinsert)
router.get('/testistatusupdate/:id',testic.testistatusupdate)
router.get('/testidelete/:id',testic.delete)
router.get('/query',queryc.showquery)
router.get('/queryreply/:id',queryc.queryform)
router.post('/queryrecord/:id',upload.single('attachment'),queryc.emailsend)
router.get('/add',addc.adminshow)
router.get('/addupdate/:id',addc.addupdatepage)
router.post('/addupdaterecord/:id',addc.addupdate)



module.exports=router