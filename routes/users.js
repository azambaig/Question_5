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

router.post('/role/insert', auth.checkToken, userController.insertRole);

router.get('/role/get', auth.checkToken, userController.getRole);

router.post('/role/update', auth.checkToken, userController.updateRole);

router.delete('/role/delete', auth.checkToken, userController.deleteRole);

module.exports = router;
