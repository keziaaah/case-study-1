import Workout from "../models/WorkoutModel.js"
import mongoose from "mongoose"
import { requireAuth } from '../middleware/requireAuth.js'
//get all workouts
export const getWorkouts = async (req,res)=>{
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
//get a single workout
export const getWorkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: "No such workout"})
    }
    else{
        res.status(200).json(workout)
    }
}
//create a new workout
export const createWorkout = async(req,res)=>{
    const {title,reps,load,user_id} = req.body
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load || load<0){
        emptyFields.push('load')
    }
    if(!reps || reps<0){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:"Enter vaild details in all fields",emptyFields})
    }
    try{
        const workout =await Workout.create({title,reps,load,user_id: req.user._id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
//delete a new workout
export const deleteWorkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout =await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(400).json({error: "No such workout"})
    }
    else{
        res.status(200).json(workout)
    }
}
//update a new workout



// Update a workout by ID
export const updateWorkout = async (req, res, next) => {
    const Workout = require("../models/WorkoutModel");
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedWorkout);
  } catch (error) {
    next(error);
  }
};
