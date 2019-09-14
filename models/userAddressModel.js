const db = require('../database/db');
const userModel = require('./userModel');

const userAddressModel = db.connection.define('userAddress', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    address: {
        type: db.Sequelize.STRING
    },
    city: {
        type: db.Sequelize.STRING
    },
    state: {
        type: db.Sequelize.STRING
    },
    pinCode: {
        type: db.Sequelize.STRING
    },
    phoneNo: {
        type: db.Sequelize.STRING
    }
},
    {
        tablename: 'userAddress',
        freezeTableName: true
    }
)

userAddressModel.sync({ force: false })
    .then((result) => {
        console.log(' Table created connection successful');
    }).catch((err) => {
        console.error('Unable to connect to database', err);
    });

userAddressModel.associate = function (model) {
    userAddressModel.belongsTo(model.userModel)
}

const insertUserAddress = async (token, body) => {
    try {
        let findData = body;
        findData.userId = token;
        let insertAddress = await userAddressModel.create(findData);
        return insertAddress;
    } catch (error) {
        return error;
    }
}

const getUserAddress = async (token) => {
    try {
        let findData = await userAddressModel.findAll({
            where: {
                userId: token
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

const updateUserAddress = async (token, body) => {
    try {
        let findData = await userAddressModel.findOne({
            where: {
                userId: token
            }
        })
        if (findData === null) {
            throw `Data not found`;
        } else {
            let updateData = await findData.update({
                address: body.address,
                city: body.city,
                state: body.state,
                pinCode: body.pinCode,
                phoneNo: body.phoneNo
            })
            return updateData;
        }
    } catch (error) {
        return error;
    }
}

const deleteUserAddress = async (token, body) => {
    try {
        let deleteUsersAddress = await userAddressModel.destroy({
            where: {
                userId: token,
                address: body.address
            }
        });
        throw `Data Deleted`;
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertUserAddress,
    getUserAddress,
    updateUserAddress,
    deleteUserAddress,
    userAddressModel
};

