const asyncHandler = require("express-async-handler");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../models")
const {JWT_EPIRES_IN,JWT_SECRET,JWT_COOKIE_EXPIRES_IN,NODE_ENV} = require('../config/env.config');



const createNewUser = (body) =>{
    return User.create({...body});
}

const findOneUser = (searchParams) => {
    return User.findOne({where:{...searchParams}})
}

const findAllUser = (searchParams)=>{
    return User.findAll({where: {...searchParams}});
}

const correctPassword = asyncHandler(async (reqPassword,userPassword) =>{
    return await bcryptjs.compare(reqPassword,userPassword);
})


const createToken = (user) => {
    const token = jwt.sign({user_id:user.user_id},JWT_SECRET,{
        expiresIn: JWT_EPIRES_IN
    })
    return token
}

const createCookieOpt = ()=>{
    const cookieOpt = {
        expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 10000),
        httpOnly:true,
        secure: NODE_ENV === 'production',
        sameSite: 'strict'
    }

    return cookieOpt
}


module.exports = {createNewUser, findOneUser, correctPassword, createToken, createCookieOpt, findAllUser}