const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { error } = require('console');



//Middleware to protect routes


const protect = async (req, res, next) => {

    try{
        let token= req.headers.authorization;
        console.log('Authorization Header:', req.headers);
        console.log('Token:', token);

        if(token && token.startsWith('Bearer')) {
            token = token.split(' ')[1];// Extract the token from the header
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
            req.user = await User.findById(decoded.id).select('-password'); 
            next();
        } else {
            res.status(401).json({message: 'Not authorized, no token', error: error.message});
        }
    } catch (error) {
        res.status(401).json({message: 'Not authorized, token failed', error: error.message});
    }

}
module.exports = {
    protect
};