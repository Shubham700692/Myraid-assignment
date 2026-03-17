import { useState,useEffect } from "react"
import API from "../utils/api"
import { useNavigate } from "react-router-dom"

export default function Login(){

 const [form,setForm] = useState({email:"",password:""})
 const navigate = useNavigate()

const handleSubmit = async(e)=>{
  e.preventDefault()

  try{
   const res = await API.post("/auth/login", form) 
   localStorage.setItem("user", JSON.stringify(res.data.user))

   navigate("/dashboard")
  }catch{
   alert("Invalid credentials")
  }

}

 return(
 <div className="container">
  <div className="card">

    <h2 className="title">Login</h2>

    <form onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}
      />

      <input
        type="password"
        className="input"
        placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})}
      />

      <button className="btn btn-primary">Login</button>
    </form>
    <p>
        Don't have an account? <a href="/register">Register</a>
      </p>

  </div>
</div>
 )
}