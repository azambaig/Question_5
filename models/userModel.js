const db = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('./userAddressModel');


const userModel = db.connection.define('user', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
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
    },
    roleId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'userRole',
            key: 'id'
        }
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

userModel.associate = function (model) {
    userModel.hasMany(model.userAddressModel)
    userModel.belongsTo(model.userRoleModel)
}

let unique = async (token, body) => {
    try {
        let result = await userModel.findOne({
            where: {
                emailId: body.emailId
            }
        });
        if (result === null) {
            let data = body;
            data.roleId = token;
            let insertedData = await userModel.create(body);
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
    try {
        let findUser = await userModel.findOne({
            where:
            {
                id: token
            }
        });
        if (findUser) {
            return findUser;
        } else {
            throw 'Data Not found'
        }
    } catch (error) {
        return error
    }
}

const deleteDetails = async (token) => {
    try {
        let deleteUser = await userModel.destroy({
            where:
            {
                id: token
            }
        });
        throw `Data Deleted`;

    } catch (error) {
        return error
    }

}

const pageDetails = async (page) => {
    let getPageDetails = await userModel.findAll();
    let pageCount = await userModel.count
    return getPageDetails;
}

module.exports = {
    unique,
    checkUser,
    findDetails,
    deleteDetails,
    pageDetails,
    userModel
};