const router=require('express').Router()
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testicontroller')
const queryc=require('../controllers/querycontroller')
const banner=require('../models/banner')
const Service=require('../models/services')
const Testi=require('../models/testi')
const Add=require('../models/address')




router.get('/',async(req,res)=>{
    //res.send('Frontend Router')
    const record=await banner.findOne()
    const serviceRecord=await Service.find({status:'Published'})
    const testiRecord=await Testi.find({status:'publish'})
    const AddressRecord=await Add.findOne()
    res.render('index.ejs',{record,serviceRecord,testiRecord,AddressRecord})
})

router.get('/banner',bannerc.banner)
router.get('/service/:id',servicec.servicedetails)
router.post('/queryrecord',queryc.insert)


module.exports=router