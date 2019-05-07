const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String, required : true},
    product : { type : mongoose.Schema.Types.ObjectId, ref : "Product", required : true}
})

module.exports = mongoose.model('Category', categorySchema)