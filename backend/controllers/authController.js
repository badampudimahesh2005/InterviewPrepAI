const User = require('../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (userId) => {

    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}



const registerUser = async (req, res) => {

    try {

        const {name, email, password, profileImageUrl} = req.body;

        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }

        //hash the password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        //create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });
        
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id) 
        });




    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};


const loginUser = async (req, res) => {

    try {

        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        //check if password is correct
        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });

    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};


const getUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select('-password');
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json(user);

    }catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

const logoutUser = async (req, res) => {
    try {
        // For JWT-based authentication, logout is typically handled client-side
        // by removing the token from localStorage/cookies
        res.status(200).json({message: 'User logged out successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};


