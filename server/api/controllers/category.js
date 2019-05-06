const Category = require('../models/category')
const mongoose = require('mongoose')


exports.category_get_all = (req,res,next)=>{
Category.find().select("name _id").exec().then(categories =>{
    const response = {
        count : categories.length,
        categories : categories.map(category =>{
            return {
                _id : category._id,
                name : category.name,
                request : {
                    type : 'GET',
                    url : "http://localhost:3090/categories/" + category._id
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


exports.categories_create_category = (req,res,next)=>{
    const category = new Category({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name
    })
    category.save().then(category =>{
        console.log(category);
        res.status(201).json({
            message : "Created category successfully",
            createdProduct : {
                name : category.name,
                _id : category._id,
                request : {
                    type : "POST",
                    url : "http://localhost:3000/categories/" + category._id
                }
            }
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error : err})
    });
}

exports.categories_get_one_categoy = (req,res,next)=>{
    const id = req.params.categoryId;
    Category.findById(id).select("name _id").exec().then((category)=>{
        console.log(category)
        if(category){
            res.status(200).json({
                category : category,
                request : {
                    type : "GET",
                    url : "http://localhost:3000/categories/" + category._id
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

exports.categories_delete_category = (req,res,next)=>{
    const id = req.params.categoryId;
    Category.remove({_id : id}).exec().then(result =>{
        if(result){
            res.status(200).json({
                message : "Category deleted",
                request : {
                    type : "DELETE",
                    url : "http://localhost:3000/categories/" + id,
                    body : { name : "String"}
                }
            })
        }else{
            res.status(404).json({message : "Category doesn't exist"})
        }
}).catch(err =>{
        console.log(err)
        res.status(500).json({error : err})
        }
    )
}