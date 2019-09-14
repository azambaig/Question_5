const db = require('../database/db');


const userRoleModel = db.connection.define('userRole', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    roleId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
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
    userRoleModel.belongsTo(model.userModel);
}

const insertUserRole = async (token, body) => {
    try {
        let data = body;
        data.roleId = token;
        let insertRole = await userRoleModel.create(data);
        return insertRole;
    } catch (error) {
        return error;
    }
}

const getUserRole = async (token) => {
    try {
        let findData = await userRoleModel.findAll({
            where: {
                roleId: token
            }
        })
        if (findData === null) {
            throw `Data not found`;
        } else {
            return findData;
        }
    } catch (error) {
        return error;
    }
}

const updateUserRole = async (token, body) => {
    try {
        let findData = await userRoleModel.findOne({
            where: {
                roleId: token,
                roleName : body.roleToBeUpdate
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

const deleteUserRole = async (token, body) => {
    try {
        let deleteData = await userRoleModel.destroy({
            where: {
                roleId: token,
                roleName : body.roleName
            }
        })
        throw `Data Deleted`
    } catch (error) {
        return error;
    }
}

module.exports = {
    userRoleModel,
    insertUserRole,
    getUserRole,
    updateUserRole,
    deleteUserRole
}