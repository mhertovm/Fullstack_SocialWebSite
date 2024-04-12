const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {sendMail} = require('../functions/sendMail');

const usersData = {}; // Save verification code and user data
exports.login = async (req, res)=> {
    const {email, password} = req.body;
    try{
        const user = await Users.findOne({
            where: {email: email},
        });
        if(!user) {
            throw {
                status: 404,
                error: "User not found",
            };
        };
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword && (user.role === 'user verified')){
            const token = generateAccessToken(user.email);
            res.status(200).json({
                jwt: token
            });
        } else if(validPassword && (user.role === 'user not verified')){
            throw {
                status: 400,
                error: "User not verified։ try to register 5 minute ago"
            }
        } else{
            throw {
                status: 401,
                error: "Invalid password",
            };
        };
    } catch(err){
        res.status(err.status? err.status : 400).json({
            message: "login not successful",
            error: err.error
        });
    };
};
exports.register = async (req, res)=> {
    const {name,surname,gender,age,email,password} = req.body;
    try{
        if(!email || !password || !name){
            throw {
                status: 400,
                error: 'Email, password and name is required'
            };
        };
        if(password.length < 8){
            throw {
                status: 400,
                error: "Password less than 8 characters"
            };
        };
        const user = await Users.findOne({
            where: {email: email}
        });
        if(user){
            throw {
                status: 400,
                error:'User already exists'
            };
        };
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        usersData[email] = {
            code: verificationCode,
            name,
            surname,
            gender,
            age,
            email,
            password: hashed_password,
        };
        sendMail(email, verificationCode);
        function deleteUserData(){
            delete usersData[email];
        };
        setTimeout(deleteUserData, 180000)
        res.status(200).json({
            message: 'Verification code sent'
        });
    } catch(err){
        console.log(err.message)
        res.status(err.status? err.status : 400).json({
            message: "Register not successful",
            error: err.error,
        });
    };
};
exports.verify = async (req, res)=> {
    const {email, code} = req.query;
    try{
        if(!email || !code){
            throw {
                status: 400,
                error: 'Email and verification code are required'
            };
        };
        if(usersData[email].code && usersData[email].code == code){
            Users.create({
                name: usersData[email].name,
                surname: usersData[email].surname,
                gender: usersData[email].gender,
                age: usersData[email].age,
                email: usersData[email].email,
                password: usersData[email].password,
                premium: 'false',
                role: 'user'
            });
            delete usersData[email];
            return res.status(200).json({
                message: 'Verification successful'
            });
        } else{
            throw {
                status: 400,
                error: 'Invalid verification code'
            };
        };
    } catch(err){
        console.log(err.message);
        res.status(err.status? err.status : 400).json({
            message: "Register not successful",
            error: err.error
        }); 
    };
};