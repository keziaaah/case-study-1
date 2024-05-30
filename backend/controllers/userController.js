import mongoose from "mongoose"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}
//login user
export const loginUser = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
export const signupUser = async (req, res) => {
    const { username, email, password } = req.body
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Invalid request body' })
    }
  
    try {
      const user = await User.signup(username, email, password)
      const token = createToken(user._id)
      res.status(200).json({ email, token })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }