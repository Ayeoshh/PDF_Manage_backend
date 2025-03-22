const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    // console.log("Received Authorization Header:", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    // const token = req.header('authentication');
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'request denied, token not provided'});
    }
    try{
        // const decoded = jwt.verify(token.replace('Bearer "," '), process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message: 'Invalid Token'});
    }
};