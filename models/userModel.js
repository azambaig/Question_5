const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userModel = db.connection.define('user', {
    userName: {
        type: db.Sequelize.STRING
    },
    Password: {
        type: db.Sequelize.STRING
    },
    confirmPassword: {
        type: db.Sequelize.STRING
    },
    emailId: {
        type: db.Sequelize.STRING
    }
},
    {
        tablename: 'user',
        freezeTableName: true
    }
);

userModel.sync({ force: false })
    .then(() => {
        console.log(' Table created connection successful');
    })
    .catch(err => {
        console.error('Unable to connect to database', err);
    });


let unique = async (body) => {
    try {
        let result = await userModel.findOne({
            where: {
                emailId: body.emailId
            }
        });
        if (result === null) {
            const newSaveObj = new userModel(body);
            let insertedData = await newSaveObj.save();
            return insertedData;
        } else {
            return `Data already exists`;
        }
    }
    catch (error) {
        return error;
    }
};

const checkUser = async (body) => {
    try {
        let matchDetails = await bcrypt.compare(body.confirmPassword, body.Password);
        if (matchDetails) {
            return userModel.findOne({
                where: {
                    emailId: body.emailId
                }
            }).then(user => {
                const token = jwt.sign({
                    token: user.id,
                }, "secret_Key", {
                        expiresIn: '1h'
                    });
                return token;
            });
        } else {
            return `Details not Matched.`
        }
    }
    catch (error) {
        return error;
    }
};

const findDetails = async (token) => {
    let findUser = await userModel.findOne({
        where:
        {
            id: token
        }
    });
    if (findUser) {
        return findUser;
    } else {
        return 'Data Not found'
    }
}

const deleteDetails = async (token) => {
    let deleteUser = await userModel.destroy({
        where:
        {
            id: token
        }
    });
    return `Data Deleted`;
}

const pageDetails = async (page) => {
    let getPageDetails = await userModel.findAll();
    return getPageDetails;
}

module.exports = {
    unique,
    checkUser,
    findDetails,
    deleteDetails,
    pageDetails
};