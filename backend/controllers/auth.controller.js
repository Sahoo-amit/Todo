import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const login = async(req,res)=>{
    const {email,password} = req.body
    try {
        const userExist = await User.findOne({email:email})
        if(!userExist) return res.status(400).json({message:"User not found"})
        const isMatch = await bcrypt.compare(password,userExist.password)
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"})
        res.status(200).json({userExist, token: await userExist.generateToken()})
    } catch (error) {
        console.log(error)
    }
}

export const signup = async(req,res)=>{
    const {fullName,email,password} = req.body
    try {
        
        const userExist = await User.findOne({email:email})
        if(userExist) return res.status(400).json({message:"User already exists"})
        const hash_password = await bcrypt.hash(password,10)
        const user = await User.create({fullName,email,password:hash_password})
        res.status(201).json({user, token: await user.generateToken()})
    } catch (error) {
        console.log(error)
    }
}