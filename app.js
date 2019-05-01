const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')
const userRoutes = require('./api/routes/user')


 mongoose.connect('mongodb://localhost/node_rest_api',{
        useNewUrlParser : true,   
});

// Cancel the warning : DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)

mongoose.Promise = global.Promise

mongoose.connection
        .once('open',() => console.log('connexion a mongo établie'))
        .on('error',(error) => {
            console.warn('Warning',error);
});   


app.use(morgan('dev'));
app.use("/uploads",express.static('uploads'));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === "OPTIONS"){
        res.header("Acces-Control-Allow-Methods", 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app