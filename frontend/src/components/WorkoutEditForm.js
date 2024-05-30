import { useState } from "react";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
const WorkoutEditForm = ({ workout, onSubmit, onCancel }) => {
    // const {dispatch}=useWorkoutsContext()
    const [title, setTitle] = useState(workout.title);
    const [load, setLoad] = useState(workout.load);
    const [reps, setReps] = useState(workout.reps);
    // const [error,setError]=useState(null)
    // const [emptyFields,setEmptyFields]=useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit({ title, load, reps });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
      <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
      {/* <button type="submit">Save</button> */}
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default WorkoutEditForm;