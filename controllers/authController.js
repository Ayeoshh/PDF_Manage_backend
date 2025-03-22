const {validationResult} = require('express-validator');
const AuthService = require('../services/authService');

class AuthController {

    static async register(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(404).json({errors: errors.array()});
        }
        try {
            const { name, email, password } = req.body;
            const response = await AuthService.registerUser(name, email, password);
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const response = await AuthService.loginUser(email, password);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { email } = req.body;
            const response = await AuthService.resetPassword(email);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updatePassword(req, res) {
        try {
            const {userId, oldPassword, newPassword } = req.body;  // fix here how to work with frontend
            // const userId = req.user.id;
            const response = await AuthService.updatePassword(userId, oldPassword, newPassword);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async protectedRoute(req, res) {
        res.json({ message: "You have accessed a protected route", user: req.user });
    }
}

module.exports = AuthController;


// exports.register = async (req, res)=>{
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(404).json({errors: errors.array()});
//     }
//     try{
//         const {name, email, password} = req.body;
//         const response = await AuthService.registerUser(name, email, password);

//         res.status(201).json(response);
//     }catch(error){
//         res.status(400).json({message: error.message});
//     }
// };

// exports.login = async (req, res)=>{
//     try{
//         const {email, password} = req.body;
//         const response = await AuthService.loginUser(email, password);

//         res.status(200).json(response);
//     }catch(error){
//         res.status(400).json({message: error.message});
//     }
// };

// exports.protectedRoute = async (req, res)=>{
//     res.json({message: 'This is a protected route', user: req.user});
// };