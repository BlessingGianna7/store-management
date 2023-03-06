const {Product} = require("../models/product.model");

exports.registerProduct = async(req,res)=>{
    try{
        const product = new Product()
        product.name = req.body.name
        product.description = req.body.description
        product.price = req.body.price
        product.registered_by = req.user.id

        await product.save()

        res.status(200).send(product)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

exports.getProducts = async(req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).send(products)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

exports.getProductById = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(product == null) return res.status(404).send("Invalid product id")

        res.status(200).send(product)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

exports.updateProduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(product == null) return res.status(404).send("Invalid product id")

        product.name = req.body.name
        product.description = req.body.description
        product.price = req.body.price

        await product.save()
        res.status(200).send(product)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

exports.deleteProduct = async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted successfully")
    }
    catch(err){

    }
}