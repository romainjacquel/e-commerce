const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const CategoryControllers = require("../controllers/category")

router.get('/', CategoryControllers.category_get_all)
router.post('/', CategoryControllers.categories_create_category)    
router.get('/:categoryId', CategoryControllers.categories_get_one_categoy)
router.delete('/:categoryId', CategoryControllers.categories_delete_category)

module.exports = router