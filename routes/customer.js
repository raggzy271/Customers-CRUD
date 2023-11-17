const express = require('express');

const controller = require('../controllers/customer');

const router = express.Router();

router.get('/get', controller.getCustomer);

router.get('/list', controller.getCustomerList);

router.post('/add', controller.addCustomer);

router.put('/edit', controller.editCustomer);

router.delete('/delete', controller.deleteCustomer);

module.exports = router;