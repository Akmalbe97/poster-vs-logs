const bcrypt = require("bcrypt")
const User = require("../schema/user.schema")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
  try {
    const {name, email, password, phone} = req.body
    const exsistUser = await User.findOne({email});
    
    if(exsistUser) {
      return res.status(400).json({message: "email already registred"})
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      name, email, password: hashPassword, phone
    })

    res.status(200).json({
      message: "user registered successfully",
      userId: newUser._id
    })
  } catch (error) {
    next (error)
  }
}

const login = async(req, res, next) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if(!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  const chekerPassword = await bcrypt.compare(password, user.password)

  if(!chekerPassword) {
    return res.status(401).json({message: "wrong passsword!"})
  }

  const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1h"})

  res.status(200).json({
    message: "login successful",
    token,
  })
}

module.exports = {
  register,
  login
}