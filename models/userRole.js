const db = require('../database/db');
const jwt = require('jsonwebtoken');

const userRoleModel = db.connection.define('userRole', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    roleName: {
        type: db.Sequelize.STRING
    }
},
    {
        tablename: 'userRole',
        freezeTableName: true
    }
)

userRoleModel.sync({ force: false })
    .then((result) => {
        console.log(' Table created connection successful');
    }).catch((err) => {
        console.error('Unable to connect to database', err);
    });

userRoleModel.associate = function (model) {
    userRoleModel.hasMany(model.userModel);
}

const createUserRole = async (body) => {
    try {
        let findData = await userRoleModel.findOne({
            where: {
                roleName: body.roleName
            }
        })
        if (findData) {
            throw `Data already exist`
        } else {
            let insertRole = await userRoleModel.create(body);
            let token = await jwt.sign({
                token: insertRole,
            }, "secret_Key", {
                expiresIn: '2h'
            });
            return token;
        }

    } catch (error) {
        return error;
    }
}

const getUserRole = async (token) => {
    try {
        let findData = await userRoleModel.findAll({});
        if (findData === null) {
            throw `Data not found`;
        } else {
            return findData;
        }
    } catch (error) {
        return error;
    }
}

const updateUserRole = async (body) => {
    try {
        let findData = await userRoleModel.findOne({
            where: {
                roleName: body.roleToBeUpdate
            }
        })
        if (findData === null) {
            throw `Data not found`;
        } else {
            let updateData = await findData.update({
                roleName: body.roleName
            })
            return updateData;
        }
    } catch (error) {
        return error;
    }
}

const deleteUserRole = async (body) => {
    try {
        let deleteData = await userRoleModel.destroy({
            where: {
                roleName: body.roleName
            }
        })
        throw `Data Deleted`
    } catch (error) {
        return error;
    }
}

module.exports = {
    userRoleModel,
    createUserRole,
    getUserRole,
    updateUserRole,
    deleteUserRole
}