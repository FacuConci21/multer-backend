const router = require('express').Router();
const { getSellers, postSeller, putSeller, getSeller } =  require('../controllers/seller-controller');


router.route('/')
    .get(getSellers)
    .post(postSeller)

router.route('/:id')
    .put(putSeller)
    .get(getSeller)

module.exports = router;