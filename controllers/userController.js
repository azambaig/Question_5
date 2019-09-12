const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

const findUser = async (req, res) => {
    try {
        let findUserDetails = await userModel.findDetails(req.token);
        if (findUserDetails) {
            res.send(findUserDetails);
        }
    } catch (error) {
        res.status(401).send(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        let deleteUserDetails = await userModel.deleteDetails(req.token);
        res.send(deleteUserDetails);
    } catch (error) {
        res.status(401).send(error);
    }
};

const getPage = async (req, res) => {
    try {
        let page = req.params.page;
        let getPageDetails = await userModel.pageDetails(page);
        res.send(getPageDetails);
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = {
    registration,
    login,
    findUser,
    deleteUser,
    getPage
};
