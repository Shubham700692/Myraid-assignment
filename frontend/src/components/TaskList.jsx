import API from "../utils/api"

export default function TaskList({tasks, fetchTasks}) {

 const deleteTask = async(id)=>{
  await API.delete(`/tasks/${id}`)
  fetchTasks()
 }
   const toggleStatus = async (task) => {
    const newStatus =
      task.status === "pending" ? "completed" : "pending"

    await API.put(`/tasks/${task._id}`, {
      status: newStatus
    })
    fetchTasks()
   }
 return (
  <div>
   {tasks.map(task => (

    <div key={task._id} className="task">

      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="task-actions">
<button
  className="btn btn-success"
  onClick={() => toggleStatus(task)}
>
  {task.status}
</button>

        <button
          onClick={()=>deleteTask(task._id)}
          className="btn btn-danger"
        >
          Delete
        </button>

      </div>

    </div>

   ))}
  </div>
 )
}