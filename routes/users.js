var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/registration', userController.registration);

router.post('/login', userController.login);

router.get('/get', auth.checkToken, userController.findUser);

router.get('/delete', auth.checkToken, userController.deleteUser);

router.get('/list/:page', userController.getPage);

router.post('/address/insert', auth.checkToken, userController.insertAddress);

router.get('/address/get', auth.checkToken, userController.getAddress);

router.post('/address/update', auth.checkToken, userController.updateAddress);

router.delete('/address/delete', auth.checkToken, userController.deleteAddress);

module.exports = router;
