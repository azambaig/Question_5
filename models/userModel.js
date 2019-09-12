const db = require('../database/db');
const bcrypt = require('bcrypt');


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
    emailId :{
        type: db.Sequelize.STRING
    }
},
    {
        tablename: 'user',
        freezeTableName: true
    }
);

userModel.sync({ force: true })
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
            let user_id = userModel.findOne({
                where : {
                    emailId : body.emailId
                }
            });
            return user_id;
        } else {
            return `Details not Matched.`
        }
    }
    catch (error) {
        return error;
    }
};

module.exports = {
    unique,
    checkUser
};