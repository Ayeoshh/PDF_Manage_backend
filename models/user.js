const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true}
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

sequelize.sync({ force: false }) // Use force: true to drop and recreate tables (Be Careful!)
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(error => {
    console.error("Error syncing database:", error);
  });

  
module.exports = User;
