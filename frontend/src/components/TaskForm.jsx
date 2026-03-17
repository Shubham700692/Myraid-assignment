import { useState } from "react"
import API from "../utils/api"

export default function TaskForm({fetchTasks}){

 const [title,setTitle] = useState("")
 const [description,setDescription] = useState("")

 const handleSubmit = async(e)=>{
  e.preventDefault()

  if (!title || !description) {
    alert("All fields required")
    return
  }

  try {
    await API.post("/tasks", { title, description })
    fetchTasks()
  } catch (err) {
    console.error(err.response?.data || err.message)
  }

  setTitle("")
  setDescription("")
//   fetchTasks()
 }

 return(
 <form onSubmit={handleSubmit} style={{marginBottom:"15px"}}>

  <input
    className="input"
    value={title}
    placeholder="Title"
    onChange={e=>setTitle(e.target.value)}
  />

  <input
    className="input"
    value={description}
    placeholder="Description"
    onChange={e=>setDescription(e.target.value)}
  />

  <button className="btn btn-primary">Add Task</button>

</form>
 )
}