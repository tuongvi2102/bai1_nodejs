const customerModel=require('../models/customer.model')
const express=require('express')
const router=express.Router()

router.get('/',async(req,res)=>{
    try{
        const customers=await customerModel.find()
        // .find() = select * trong sql
        res.render('customers/list',{customers:customers})

    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/add',(req,res)=>{
    res.render('customers/add')
})
router.put('/edit',(req,res)=>{
    res.render('customers/edit')
})
router.post('/add',async(req,res)=>{
    try{
        const newCus=new customerModel({
            name:req.body.name,
            old:req.body.old
        })
        await newCus.save() // cú pháp insert 1 dòng dữ liệu
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/') //redirect: đưa về lại trang '/' là trang chủ
    }
})
router.delete('/delete/:id', async(req,res)=>{
    try{
        await customerModel.findByIdAndDelete(req.params.id)
        res.redirect('/customer')
    }catch(err)
    {
        console.log(err.message)
        res.redirect('/')
    }
    
})
router.get('/edit/:id',async(req,res)=>{
    try{
        const customer= await customerModel.findById(req.params.id)
        res.render('customers/edit',{customer:customer})
    }catch(err)
    {
        console.log(err.message)
        res.redirect('/')
    }
})
router.post('/edit/:id',async(req,res)=>{
    try{
        const customer= await customerModel.findById(req.params.id)
        customer.name=req.body.name
        customer.old=req.body.old
        await customer.save()
        res.redirect('/customer')

    }catch(e)
    {
        console.log(e)
        res.redirect("/")
    }
})
module.exports=router