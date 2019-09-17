const multer = require('multer');
const db = require('../database/db');
const model = require('../models/userModel');
const jwt = require('jsonwebtoken');


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/home/etech/Documents')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({ storage: storage });

const imageModel = db.connection.define('image', {
    id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fileName: {
        type: db.Sequelize.STRING
    }
},
    {
        tablename: 'image',
        freezeTableName: true
    }
)

imageModel.sync({ force: false })
    .then((result) => {
        console.log(' Table created connection successful');
    }).catch((err) => {
        console.error('Unable to connect to database', err);
    });

imageModel.associate = function (model) {
    imageModel.hasMany(model.userModel);
}

const uploadImage = async (token, file) => {
    try {
        let findUser = await model.userModel.findOne({
            where:
            {
                id: token
            }
        });
        if (findUser) {
            let insertimage = await findUser.update({
                imageID: file.filename
            });

            return insertimage;
        } else {
            throw 'Data Not found'
        }

    } catch (error) {
        return error;
    }
}


module.exports = {
    upload,
    uploadImage,
    imageModel
}