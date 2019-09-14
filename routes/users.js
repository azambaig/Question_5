var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/registration', auth.authenticateRole, userController.registration);

router.post('/login', userController.login);

router.get('/get', auth.checkToken, userController.findUser);

router.delete('/delete', auth.checkToken, userController.deleteUser);

router.get('/list/:page', userController.getPage);

router.post('/address/insert', auth.checkToken, userController.insertAddress);

router.get('/address/get', auth.checkToken, userController.getAddress);

router.post('/address/update', auth.checkToken, userController.updateAddress);

router.delete('/address/delete', auth.checkToken, userController.deleteAddress);

router.post('/role/create', userController.createRole);

router.get('/role/get', userController.getRole);

router.post('/role/update', userController.updateRole);

router.delete('/role/delete', userController.deleteRole);

module.exports = router;
