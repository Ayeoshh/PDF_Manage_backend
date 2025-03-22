const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const ShareLink = sequelize.define('ShareLink',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, 
    pdfId:{
        type: DataTypes.UUID,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = ShareLink;