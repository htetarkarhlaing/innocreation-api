const User = require('../models/user.model');

exports.login = function ( req, res ) {
    const password = req.body.password;
    const query = {
        email: req.body.email
    }
    User.findOne(query, ( err, user ) => {
        if(err && !user){
            res.status(404).json({
                meta: {
                    success: false,
                    message: "No user with this email"
                },
                self: req.originalURL
            })
        }
        else {
            const dbPassword = user.password;
            if( password == dbPassword ) {
                res.status(200).json({
                    meta: {
                        success: true,
                        message: "login-success"
                    },
                    data: {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    },
                    self: req.originalURL
                })
            }
            else {
                res.status(404).json({
                    meta: {
                        success: false,
                        message: "Incorrect password"
                    },
                    self: req.originalURL
                })
            }
        }
    })
}

exports.register = function ( req, res ) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    //check email is existing or not
    User.findOne({ email }, ( err, user ) => {
        if(user){
            res.status(400).json({
                meta: {
                    success: false,
                    message: "Email already exist"
                },
                data: err,
                self: req.originalURL
            })
        }
        else {
            userInsert = new User({
                username,
                email,
                password
            });
            try {
                userInsert.save();
                res.status(201).json({
                    meta: {
                        success: true,
                        message: "user account created successfully"
                        
                    },
                    data: userInsert,
                    self: req.originalURL
                });
            } catch (err) {
                res.status(500).json({
                    meta: {
                        success: false,
                        message: "Internal server error " + err
                    },
                    self: req.originalURL
                })
            }
        }
    })
}