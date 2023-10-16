//? This route will be used to create login/signup for user.
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../model/Users.js'

const router = express.Router();

//? Post Request for Registering and Login:
router.post('/register', async (req,res)=>{
    const {username, password} = req.body;
    //* Requesting the Database to check whether the user exists or not
    const user = await UserModel.findOne({ username }) //? Finding the username with username entered.
    if(user){
        return res.json({message: 'User already exist'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({username, password:hashedPassword}); //? Create a new user in the database.
    await newUser.save();
    res.json({message: 'User Registered Successfully'});
});
//! When we try to login a token should be sent to the frontend to user. The user need to verify they are the logged in user by sending the token to database/backend.
router.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({ username });
    if(!user){
        return res.json({message: 'User Not Found'});
    }
    const isValidPassword = bcrypt.compare(password, user.password); //? If user exists then it will compare the saved password and password entered by the user during the login.
    if(!isValidPassword){
        return res.json({message: 'Enter the valid password'});
    }
    //! Adding the token to user logged in for authentication.
    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id});
});

export {router as userRouter};

export const verifyToken = (res, req, next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret",(err)=>{
            if(err) return res.sendStatus(403)
            next();
        });
    }
    else{ //? If token is not present.
        res.sendStatus(401);
    }
}