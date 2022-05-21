const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');

const router = express.Router();


/*======= Routes ========*/

/* 
Type: POST
Route: /api/auth/register
Access: PUBLIC
Desc: route for registering a new user 
*/

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const userWithEmail = await User.findOne({email})
        if(userWithEmail) 
            return res.status(409).json({
                msg: 'Email already exists. Please signin.....!',
            });

        const userWithUsername = await User.findOne({ username });
        if(userWithUsername) {
            return res.status(409).json({
                msg: 'Username already exists. Please Signin.....!',
            });
        }

        // hash password and store user in the database
        bcrypt.genSalt(10, function(err, salt) { 
            bcrypt.hash(password, salt, async function(err, hash) {
                const newUser = new User({
                    username,
                    email,
                    password: hash,
                });

                const savedUser = await newUser.save();
                console.log('savedUser', savedUser);
                delete savedUser['password'];
                
                // creating jsonwebtoken 
                let payload = {};
                payload['id'] = savedUser['_id'];
                payload['email'] = savedUser['email'];
                jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {   
                    if(token) {
                        return res.status(200).json({
                            user: savedUser,
                            token: `Bearer ${token}`,
                        });
                    }
                    throw new Error('Internal Server Error');
                });

            });
        })
    }
    catch(error) {
        console.log(error);
        res.status(503).json({error});
    }
});

/* 
Type: POST
Route: /api/auth/login
Access: PUBLIC
Desc: route for user login 
*/

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).json({
                msg: 'User is not registered. Please register.!',
            });
        }
        bcrypt.compare(password, user.password)
            .then(result => {
                if(!result) {
                    res.status(302).json({
                        msg: 'Invalid Credentials. Please try again.!',
                    })
                }
    
                // create jsonwebtoken
                let payload = {};
                payload['id'] = user['_id'];
                payload['email'] = user['email']; 
                jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
                    if(token) {
                        delete user['password'];
                        return res.status(200).json({
                            user,
                            token: `Bearer ${token}`,
                        });
                    }
                    throw new Error('Internal Server Error. Please try again.!');
                });
            });
    }
    catch(error) {
        return res.status(503).json(error);
    }
});


module.exports = router;