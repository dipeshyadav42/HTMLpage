const express=require('express')
const app=express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const frontendRouter=require('./routers/frontend')
const adminRouter=require('./routers/admin')
const mongoose=require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
const session=require('express-session')





app.use(session({
    secret:process.env.KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(frontendRouter)
app.use('/admin',adminRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT)