import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
export const signup = async(req, res)=>{
const {username, email, password} = req.body;

if(!username || !password || !email || username==='' || password==='' || email===''){
return res.status(400).json({message:"All fields are required"})
}

const hashpassword = bcryptjs.hashSync(password, 10);

const newUser = new User({
    email,
    password:hashpassword,
    username
});

try{
    await newUser.save();
res.json({message:"Signup sucesssful"})
}
catch (error){
res.status(500).json({message:error.message})
}

}