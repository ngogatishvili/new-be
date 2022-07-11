const User = require('../models/User');
const {BadRequestError, UnauthenticatedError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const RegisterUser = async (req, res) => {
  const user = await User.create({...req.body});
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({token, user: {name: user.name,id:user._id}});
};

const LoginUser = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({email: email});
  if (!user) {
    throw new UnauthenticatedError('no user is found with this E-mail');
  }
  
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('password is not correct');
  }

  const token = await user.createJWT();

  return res.status(StatusCodes.OK).json({token, user: {name: user.name,id:user._id}});
};


 const changeUsername=async(req,res)=>{
    const {value}=req.body;
    console.log(value);
    const {id}=req.params;
    if(!value) {
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"Must provide a value"})
    
    }

    let user=await User.findById(id);
    user.name=value;

    const updatedUser=await User.findByIdAndUpdate(id,user,{new:true})
   return  res.status(StatusCodes.OK).json(updatedUser?.name)
    
    
}

module.exports = {RegisterUser, LoginUser,changeUsername};
