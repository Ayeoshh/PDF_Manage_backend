const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const PDF = sequelize.define('PDF', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    originalname: {
        type: DataTypes.STRING,
        allowNUll: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNUll: false,
    },
    fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uploadedBy:{
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
    },
    shareableLink:{
        type: DataTypes.STRING,
        allowNull: true
    }
});


module.exports = PDF;