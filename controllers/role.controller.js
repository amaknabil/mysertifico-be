const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/customError");
const { Role } = require("../models");



const createNewRoleHandler = asyncHandler(async(req,res) =>{
    const { role_name } = req.body;

    if(!role_name){
        throw new CustomError('Please provide Role',400);
    }

    const role = await Role.create({role_name});

    res.status(201).json({
        status:'success',
        role
    })

});

module.exports = {createNewRoleHandler }