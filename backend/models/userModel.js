import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from 'validator'
const Schema =mongoose.Schema
const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})
userSchema.statics.signup = async function (username, email, password) {
    if(!username || !email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const existEmail = await this.findOne({ email })
    const existUsername = await this.findOne({ username })
  
    if (existUsername) {
      throw Error('Username already taken')
    } else if (existEmail) {
      throw Error('Email already exists')
    }
  
    try {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      const user = await this.create({
        username,
        email,
        password: hash,
      })
  
      return user
    } catch (error) {
      throw Error('Could not create user')
    }
  }
  userSchema.statics.login = async function ( email, password){
    if(!email|| !password){
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error("Incorrect email or username")
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect password")
    }
    return user
  }
export default mongoose.model('User', userSchema)