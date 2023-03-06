const mongoose = require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type:Number,
        required: true
    },
    registered_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Product = mongoose.model('products',productSchema)

exports.Product = Product
