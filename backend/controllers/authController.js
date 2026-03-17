const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
 return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
}


exports.register = async (req, res,next) => {
     const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });

 try {
  const { name, email, password } = req.body


  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" })
  }


  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)


  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )


  res.cookie("token", token, {
    httpOnly: true,
    ssameSite: "none",
    secure: true
  })

  res.status(201).json({
    token,
    user: {
      name: user.name,
      email: user.email
    }
  })

 } catch (err) {
  console.error("REGISTER ERROR:", err) 
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
    sameSite: "none",
    secure: true
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