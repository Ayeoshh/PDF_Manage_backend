// const {Sequelize} = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_DATABASE,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: 'postgres',
//         logging: false,
//     }
// );

// (async ()=>{
//     try{
//         await sequelize.authenticate();
//         console.log('PostgresSQL connection established successfully');
//     }catch(error){
//         console.log('Unable to connect to postgresSQL:', error);
//     }
// })();

// module.exports = sequelize;


const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connection established successfully');
    } catch (error) {
        console.log('Unable to connect to PostgreSQL:', error);
    }
})();

module.exports = sequelize;
