const { JsonWebTokenError } = require('jsonwebtoken');
const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  add-users
exports.addUserController = async (req, res) => {
    console.log("inside addUserController");
    const { username, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already Exists")
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptedPassword,profilePic:""
            })
            await newUser.save()
            res.status(200).json({
                newUser
            })
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

exports.loginController = async (req, res) => {
    console.log("inside loginController");
    console.log("req.body is:", req.body);

    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            let isUserPasswordMatch = await bcrypt.compare(password, existingUser.password)
            if (isUserPasswordMatch || password == existingUser.password) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
                res.status(200).json({ user: existingUser, token })
            }
        } else {
            res.status(404).json("Invalid Credentials")
        }
    } catch (err) {
        res.status(401).json(err.message)
    }
}

exports.editUserController = async (req, res) => {
    console.log("inside editUserController");

    const { profilePic } = req.body;   // <- extract only the string
    const userId = req.userId;

    try {
        const existingUser = await users.findById(userId);
        
        if (!existingUser) {
            return res.status(404).json("User not found");
        }

        existingUser.profilePic = profilePic; // <- save only the string
        await existingUser.save();

        res.status(200).json(existingUser);
    } catch (err) {
        res.status(401).json(err.message);
    }
};

// get all-users (admin)
exports.getAllUserController = async(req,res)=> {
    console.log("inside getAllUserController");
    try{
        const allUsers = await users.find({role:"user"})
        res.status(200).json(allUsers)
    }catch(err){
        res.status(401).json(err.message)
    }
}

module.exports = exports;
