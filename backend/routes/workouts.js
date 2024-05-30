import express from "express"
import bodyParser from "body-parser"
import {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} from "../controllers/workoutController.js"
import { requireAuth } from "../middleware/requireAuth.js"
const router = express.Router()
router.use(bodyParser.json())
router.use(requireAuth)
router.get('/',getWorkouts)
router.get('/:id',getWorkout)

//POST a new workout
router.post('/',createWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)
//UPDATE  a workout
router.patch('/:id',updateWorkout)
export default router