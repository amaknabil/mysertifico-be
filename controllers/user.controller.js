const asyncHandler = require("express-async-handler");
const { findOneUser, findAllUser } = require("../services/user.service");



const getCurrentUserHandler = asyncHandler(async(req,res) => {
    const user_id = req.user.user_id
    const user = await findOneUser({ user_id });
    user.password = undefined
    res.status(200).json(user);
});

const getAllUserHandler = asyncHandler(async(req,res) =>{
    const users = await findAllUser();
    res.status(200).json({
        message:"success",
        result:users.length,
        users
    })
})

module.exports = {getCurrentUserHandler,getAllUserHandler}