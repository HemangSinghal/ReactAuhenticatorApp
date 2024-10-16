const User = require('../Models/userModel.js');
const createError = require('../utils/appError.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user)
            return next(new createError("User Already Exists"))
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        })

        //Assig Jwtweb Token to user
        const token = jwt.sign({ _id: newUser._id }, 'seretkey123', {
            expiresIn: '90d'
        });

        res.status(201).json({
            status: 'success',
            message: 'User registered Successfully',
            token,
            user: user,
        });
    }
    catch (error) {
        next(error);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(new createError("User not found!", 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return next(new createError("Incorrect emai or password", 401));

        const token = jwt.sign({ _id: user._id }, 'seretkey123', {
            expiresIn: '90d'
        });

        res.status(200).json({
            status: 'success',
            token,
            message: 'Logged in successfully',
            role: user.role,
            user: user,
        })

    }
    catch (error) {
        next(error)
    }
};

