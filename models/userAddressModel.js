const db = require('../database/db');

const userAddressModel = db.connection.define('userAddress', {
    userId: {
        type: db.Sequelize.STRING
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

const insertUserAddress = async (body) => {
    try {
        let findData = await userAddressModel.findAll({
            where: {
                userId: body.userId
            }
        })
        if (findData === null) {
            let insertAddress = await userAddressModel.create(body);
            return insertAddress;
        } else {
            let insertAddress = await userAddressModel.create(body);
            return findData;
        }
    } catch (error) {
        return error;
    }
}

const getUserAddress = async (body) => {
    try {
        let findData = await userAddressModel.findAll({
            where: {
                userId: body.userId
            }
        })
        if (findData === null) {
            return `Data not found`;
        } else {
            return findData;
        }
    } catch (error) {
        return error;
    }
}


const updateUserAddress = async (body) => {
    try {
        let findData = await userAddressModel.findOne({
            where: {
                id: body.id
            }
        })
        if (findData === null) {
            return `Data not found`;
        } else {
            let updateData = await findData.update({
                address: body.address,
                city: body.city,
                state: body.state,
                pinCode: body.pinCode,
                phoneNo: body.phoneNo
            })
            return updateData
        }
    } catch (error) {
        return error;
    }
}

const deleteUserAddress = async (body) => {
    try {
        let deleteUsersAddress = await userAddressModel.destroy({
            where: {
                userId: body.userId,
                address: body.address
            }
        });
        return `Data Deleted`;
    } catch (error) {
        return error;
    }
}

module.exports = {
    insertUserAddress,
    getUserAddress,
    updateUserAddress,
    deleteUserAddress
};

