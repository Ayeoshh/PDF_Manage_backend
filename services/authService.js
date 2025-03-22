const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

class AuthServices{

    static generateToken(user){
        return jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
    }

    static async registerUser(name, email, password){
        try{
            let existingUser = await User.findOne({where: {email}});
            if(existingUser){
                throw new Error('User already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                name,
                email, 
                password: hashedPassword
            });
            return {message: 'User created successfully', user};
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async loginUser(email, password){
        try{
            console.log(email, password);
            const user = await User.findOne({where: {email}});
            if(!user){
                throw new Error('Invalid credentials');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error('Invalid credentials');
            }

            const token = this.generateToken(user);
            return{
                token,
                user: {
                    id: user.id, name: user.name, email: user.email
                }
            };
        }catch(error){
            throw new Error(error.message);
        }
    }

    static async resetPassword(email){
        try{
            const user = await User.findOne({where: {email}});
            if(!user){
                throw new Error('User not found');
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetExpires = new Date();
            resetExpires.setHours(resetExpires.getHours()+1);

            user.resetToken = resetToken;
            user.resetExpires = resetExpires;
            await user.save();

            console.log(`Password reset link: ${process.env.BASE_URL}/reset-password/${resetToken}`); // Simulate sending an email (replace this with an actual email service) use nodemailer for reset password link

            return {message: 'Password reset link has been sent to your email'};
        }catch(error){
            throw new Error(error.message);
        }
    }
    //reset password token and new password and compare authentication and update for the user
    static async updatePassword(userId, oldPassword, newPassword){
        try{
            const user = await User.findByPk(userId);
            if(!user){
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if(!isMatch){
                throw new Error('Incorrect old password');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            return {message: 'Password updated Successfully'};
        }catch(error){
            throw new Error(error.message);
        }
    }
};

module.exports = AuthServices;
