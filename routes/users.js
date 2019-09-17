var express = require('express');
var router = express.Router();
const multer = require('../models/imageModel');
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

router.post('/role/create', auth.checkAdmin, userController.createRole);

router.get('/role/get', auth.checkAdmin, userController.getRole);

router.post('/role/update', auth.checkAdmin, userController.updateRole);

router.delete('/role/delete', auth.checkAdmin, userController.deleteRole);

router.post('/flipkart/mobile', userController.fetchMobiles);

router.post('/profile/upload', multer.upload.single('image'), auth.checkToken, userController.uploadImage);


module.exports = router;
