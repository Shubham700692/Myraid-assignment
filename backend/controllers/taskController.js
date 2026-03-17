import Task from "../models/Task.js"

export const createTask = async (req, res) => {
 try {

  

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" })
  }

  const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    createdBy: req.user.id
  })

  res.status(201).json(task)

 } catch (err) {
  
  res.status(500).json({ message: "Server Error" })
 }
}
export const getTasks = async(req,res)=>{

 const page = parseInt(req.query.page) || 1
 const limit = 5

 const search = req.query.search || ""

 const tasks = await Task.find({
  createdBy:req.user.id,
  title:{$regex:search,$options:"i"}
 })
 .skip((page-1)*limit)
 .limit(limit)

 res.json(tasks)

}
export const updateTask = async(req,res)=>{

 const task = await Task.findOneAndUpdate(
  {_id:req.params.id,createdBy:req.user.id},
  req.body,
  {new:true}
 )

 res.json(task)
}
export const deleteTask = async(req,res)=>{

 await Task.findOneAndDelete({
  _id:req.params.id,
  createdBy:req.user.id
 })

 res.json({message:"Task deleted"})
}