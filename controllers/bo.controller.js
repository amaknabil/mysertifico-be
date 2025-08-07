const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const CustomError = require("../utils/customError");

const updateBOHandler = asyncHandler(async (req, res) => {
  const { full_name } = req.body;
  const user_id = req.user.user_id;

  if(!full_name){
    throw new CustomError("Please provide full name details")
  }

  const user = await User.findOne({where:{user_id}});

  if(!user){
    throw new CustomError("There is no user exist with that user id")
  }

  user.full_name = full_name;

  await user.save();

  res.status(200).json({
    status:'success update BO details',
  })
});


module.exports = {updateBOHandler}
