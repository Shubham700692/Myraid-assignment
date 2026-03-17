import { useEffect,useState } from "react"
import API from "../utils/api"
import { useNavigate } from "react-router-dom"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

export default function Dashboard(){

 const [tasks,setTasks] = useState([])
 const [search,setSearch] = useState("")
 const navigate = useNavigate()
let user = null

try {
  user = JSON.parse(localStorage.getItem("user"))
} catch {
  user = null
}
console.log(user)
 const fetchTasks = async()=>{
  try{
   const res = await API.get(`/tasks?search=${search}`)
   setTasks(res.data)
  }catch{
   navigate("/")
  }
 }
  const handleLogout = async () => {
    await API.post("/auth/logout")
    localStorage.removeItem("user")
    navigate("/login")
  }

 useEffect(()=>{
  fetchTasks()
 },[search])

 return(
 <div className="dashboard">

     <div className="header">
  <h2>Task Manager</h2>
  <p className="profile">👋 Welcome, <strong>{user?.name}</strong></p>
</div>

    <button className="btn btn-danger logout" onClick={handleLogout}>
      Logout
    </button>


  <input
    className="search"
    placeholder="Search tasks..."
    onChange={e=>setSearch(e.target.value)}
  />

  <TaskForm fetchTasks={fetchTasks}/>
  <TaskList tasks={tasks} fetchTasks={fetchTasks}/>

</div>
 )
}