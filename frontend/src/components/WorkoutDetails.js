import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import WorkoutEditForm from "./WorkoutEditForm";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEditing, setIsEditing] = useState(false);
  const {user} = useAuthContext()
  const handleDelete = async () => {
    if(!user){
      return
    }
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

//   const handleUpdate = () => {
//     setIsEditing(true);
//   };

  const handleUpdateSubmit = async (updatedWorkout) => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkout),
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      setIsEditing(false);
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <WorkoutEditForm
          workout={workout}
          onSubmit={handleUpdateSubmit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
          <span className="material-symbols-outlined" onClick={handleDelete}>
            Delete
          </span>
          {/* <span className="material-symbols-outlined" onClick={handleUpdate}>
            Update
          </span> */}
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;