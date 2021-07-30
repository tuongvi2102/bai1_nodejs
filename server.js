const express=require('express')
const customerRouter = require('./routes/customer')
const indexRouter=require('./routes/index')
const mongoose=require('mongoose')
const methodOverride= require('method-override')
require('dotenv').config() 
const app=express()


//views
app.use(methodOverride('_method'))
app.set('view engine','ejs')
// This code also sets EJS as the view engine for the Express application using

app.use(express.urlencoded({ extended: false }))
// khi dùng req.body. thì phải có dòng này để lấy được dữ liệu post lên

const connectFunc= async()=>{
    try{
        await mongoose.connect(process.env.STR_CONNECT)
        console.log("connected Successfull!")
    } catch (error){
        console.log("Connection failed")
    }
}
connectFunc()

app.use('/customer/',customerRouter)
app.use('/',indexRouter)
app.listen(3000)
