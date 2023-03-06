const express = require('express');
const app = express.Router()
const {registerProduct,getProducts,deleteProduct,updateProduct,getProductById} = require("../controllers/product.controller")
const authMiddleware = require("../middlewares/auth.middleware")

app.post("/products/new",authMiddleware,registerProduct)
app.get("/products", getProducts)
app.get("/products/:id",getProductById)
app.delete("/products/:id/delete",authMiddleware, deleteProduct)
app.put("/products/:id/update", authMiddleware, updateProduct)

module.exports = app