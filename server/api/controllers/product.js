const mongoose = require('mongoose')
const Product = require("../models/product")

exports.products_get_all = (req,res,next)=>{

    Product.find().select("name price description feature _id productImage").exec().then(products =>{
        const response = {
            count : products.length,
            products : products.map(product =>{
                return {
                    name : product.name,
                    price : product.price,
                    description : product.description,
                    feature : product.feature,
                    _id : product._id,
                    productImage : product.productImage,
                    request : {
                        type : 'GET',
                        url : "http://localhost:3000/products/" + product._id
                    }
                }
            })
        }
            res.status(200).json(response)
       
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error : err})
    }
    )
}

exports.products_create_product = (req,res,next)=>{
    console.log(req.file)
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
        feature : req.body.feature,
        productImage : req.file.path
    })
    product.save().then(product =>{
        console.log(product);
        res.status(201).json({
            message : "Created product successfully",
            createdProduct : {
                name : product.name,
                price : product.price,
                description : product.description,
                feature : product.feature,
                _id : product._id,
                request : {
                    type : "POST",
                    url : "http://localhost:3000/products/" + product._id
                }
            }
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error : err})
    });
}

exports.products_get_one_product = (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id).select("name price description feature _id productImage").exec().then((product)=>{
        console.log(product)
        if(product){
            res.status(200).json({
                product : product,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/products/" + product._id
                }
            })
        }else{
            res.status(404).json({message : "Invalid id"})
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error : err})
    })
}

exports.products_update_product =  (req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id : id}, {$set : updateOps}).exec().then(result =>{
        console.log(result)
        res.status(200).json({
            message : "Product updated",
            request : {
                type : "GET",
                url : "http://localhost:3000/products/" + id
            }
        })
    }).catch(err =>{
        res.status(500).json({error : err})
    })
}

exports.products_delete_product = (req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id : id}).exec().then(result =>{
        if(result){
            res.status(200).json({
                message : "Product deleted",
                request : {
                    type : "DELETE",
                    url : "http://localhost:3000/products/" + id,
                    body : { name : "String", price : "Number", desription : "String", feature : "String"}
                }
            })
        }else{
            res.status(404).json({message : "Product doesn't exist"})
        }
}).catch(err =>{
        console.log(err)
        res.status(500).json({error : err})
        }
    )
}