const router = require('express').Router();
const { getClients, postClient, putClient, getClientById } =  require('../controllers/client-controller');


router.route('/')
    .get(getClients)
    .post(postClient)

router.route('/:id')
    .put(putClient)
    .get(getClientById)

module.exports = router;
