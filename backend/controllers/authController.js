const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
 return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
}

// exports.register = async(req,res)=>{

//  const {name,email,password} = req.body

//  const userExists = await User.findOne({email})

//  if(userExists){
//   return res.status(400).json({message:"User already exists"})
//  }

//  const hashed = await bcrypt.hash(password,10)

//  const user = await User.create({
//   name:user.name,
//   email,
//   password:hashed
//  })

//  const token = generateToken(user._id)

//  res.cookie("token", token, {
//  httpOnly: true,
//  secure: false,
//  sameSite: "lax"
// })

//  res.json(user)
// }
exports.register = async (req, res) => {
 try {
  const { name, email, password } = req.body

  // ✅ check fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" })
  }

  // ✅ check existing user
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  // ✅ hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // ✅ create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  // ✅ token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  // ✅ cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  })

  res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email
    }
  })

 } catch (err) {
  console.error("REGISTER ERROR:", err) // 🔥 MUST
  res.status(500).json({ message: "Server Error" })
 }
}
exports.login = async(req,res)=>{

 const {email,password} = req.body

 const user = await User.findOne({email})

 if(!user){
  return res.status(400).json({message:"Invalid credentials"})
 }

 const match = await bcrypt.compare(password,user.password)

 if(!match){
  return res.status(400).json({message:"Invalid credentials"})
 }

 const token = generateToken(user._id)

res.cookie("token", token, {
 httpOnly: true,
 secure: false,
 sameSite: "lax"
})

 res.json(user)

}
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
secure: true
  })

  res.json({ message: "Logged out successfully" })


}