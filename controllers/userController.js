const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const userAddressModel = require('../models/userAddressModel');
const userRoleModel = require('../models/userRole');
const scrappingModel = require('../models/flipkartModel');


const registration = async (req, res) => {
    try {
        if (req.body.Password === req.body.confirmPassword) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.Password, salt);
            req.body.Password = hash;
            let uniqueData = await userModel.unique(req.convertedToken, req.body);
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
        let findUserDetails = await userModel.findDetails(req.convertedToken);
        if (findUserDetails) {
            res.send(findUserDetails);
        }
    } catch (error) {
        res.status(401).send(error);
    }
};

const deleteUser = async (req, res) => {
    try {
        let deleteUserDetails = await userModel.deleteDetails(req.convertedToken);
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

const insertAddress = async (req, res) => {
    try {
        let insertUsersProfile = await userAddressModel.insertUserAddress(req.convertedToken, req.body);
        res.send(insertUsersProfile);
    } catch (error) {
        res.send(401).send(error);
    }
};

const getAddress = async (req, res) => {
    try {
        let getUsersAddress = await userAddressModel.getUserAddress(req.convertedToken)
        res.send(getUsersAddress)
    } catch (error) {
        res.status(401).send(error);
    }
}

const updateAddress = async (req, res) => {
    try {
        let updateUsersAddress = await userAddressModel.updateUserAddress(req.convertedToken, req.body)
        res.send(updateUsersAddress)
    } catch (error) {
        res.status(401).send(error);
    }
}

const deleteAddress = async (req, res) => {
    try {
        let deleteUsersAddress = await userAddressModel.deleteUserAddress(req.convertedToken, req.body)
        res.send(deleteUsersAddress)
    } catch (error) {
        res.status(401).send(error);
    }
}

const createRole = async (req, res) => {
    try {
        let createUsersRole = await userRoleModel.createUserRole(req.body);
        res.send(createUsersRole);
    } catch (error) {
        res.send(401).send(error);
    }
};

const getRole = async (req, res) => {
    try {
        let getUsersRole = await userRoleModel.getUserRole()
        res.send(getUsersRole)
    } catch (error) {
        res.status(401).send(error);
    }
}

const updateRole = async (req, res) => {
    try {
        let updateUsersRole = await userRoleModel.updateUserRole(req.body)
        res.send(updateUsersRole)
    } catch (error) {
        res.status(401).send(error);
    }
}

const deleteRole = async (req, res) => {
    try {
        let deleteUsersRole = await userRoleModel.deleteUserRole(req.body)
        res.send(deleteUsersRole)
    } catch (error) {
        res.status(401).send(error);
    }
}

const fetchMobiles = async (req, res) => {
    try {
        let scrapDetails = await scrappingModel.scrappingDetails(req.body);
        res.send(scrapDetails)
    } catch (error) {
        res.status(401).send(error);
    }
};


module.exports = {
    registration,
    login,
    findUser,
    deleteUser,
    getPage,
    insertAddress,
    getAddress,
    updateAddress,
    deleteAddress,
    createRole,
    getRole,
    updateRole,
    deleteRole,
    fetchMobiles
};
