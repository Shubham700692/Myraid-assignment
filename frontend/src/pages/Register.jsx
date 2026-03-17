import { useState } from "react"
import API from "../utils/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Register(){

 const [form,setForm] = useState({name:"",email:"",password:""})
 const navigate = useNavigate()

 const handleSubmit = async(e)=>{
  e.preventDefault()

  try{
  const res = await API.post("/auth/register", form)

localStorage.setItem("user", JSON.stringify(res.data.user))

navigate("/dashboard")
  }catch{
   alert("Error")
  }
 }

 return(
  <div className="container">
  <div className="card">

    <h2 className="title">Register</h2>

    <form onSubmit={handleSubmit}>
      <input className="input" placeholder="Name"
        onChange={e=>setForm({...form,name:e.target.value})}
      />

      <input className="input" placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}
      />

      <input type="password" className="input" placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})}
      />

      <button className="btn btn-success">Register</button>
    </form>
    <p>
  Already have an account?  <Link to="/login">Login</Link>
</p>
    
  </div>
</div>
 )
}