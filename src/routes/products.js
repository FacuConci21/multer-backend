const router = require('express').Router();
const { 
    getProduct, getProducts, postProducts, putProducts, deleteProducts
} = require('../controllers/products-controller');


router.route('/')
    .get(getProducts)
    .post(postProducts)

router.route('/:id')
    .put(putProducts)
    .get(getProduct)
    .delete(deleteProducts)

module.exports = router;