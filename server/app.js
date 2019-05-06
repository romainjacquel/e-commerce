const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')
const userRoutes = require('./api/routes/user')
const categoryRoutes = require('./api/routes/category')


 mongoose.connect('mongodb://localhost/e_commerce',{
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

app.use(cors())
app.options('*', cors())
app.use(morgan('dev'));
app.use("/uploads",express.static('uploads'));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use("/categories", categoryRoutes)
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