const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const registration = async (req, res) => {
    try {
        if (req.body.Password === req.body.confirmPassword) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.Password, salt);
            req.body.Password = hash;

            let uniqueData = await userModel.unique(req.body);
            res.send(uniqueData);
        }
    } catch (error) {
        res.status(401).send(error);
    }
};

const login = async (req, res) => {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.Password, salt);
        req.body.Password = hash;
        let checkUsersDetails = await userModel.checkUser(req.body);
        res.send(checkUsersDetails);
    } catch (error) {
        res.status(401).send(error);
    }
};
module.exports = {
    registration,
    login,

}