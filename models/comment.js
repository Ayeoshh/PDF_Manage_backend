const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const PDF = require('./pdf');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    pdfId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    parentId: {
        type: DataTypes.UUID,
        allowNull: true, 
    }
    // id: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: DataTypes.UUIDV4,
    //     primaryKey: true,
    // },
    // pdfId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: PDF,
    //         key: 'id'
    //     },
    //     allowNull: false
    // },
    // author: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    // text: {
    //     type: DataTypes.TEXT,
    //     allowNull: false
    // }
});

module.exports = Comment;