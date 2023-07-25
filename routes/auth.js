const router  = require("express").Router()
const User = require("../models/user")
const CryptoJS = require("crypto-js")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()


router.post("/register",async (req,res) => {
    const newUser = new User({
        username:req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
        })
    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
 console.log(savedUser)
    } catch(err){
    console.log(err)
    res.status(500).json(err)
    }
})
router.post("/login",async (req,res) => {
    try{
        const user = await User.findOne({username:req.body.username});
       !user && res.status(401).json("wrong credentials")
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const password = hashedPassword.toString(CryptoJS.enc.Utf8);
        password !== req.body.password && res.status(401).json("wrong credentials")
        const accessToken = jwt.sign({
            id:user._id,

        },process.env.JWT_SEC,{
            expiresIn:"3d"
        })

        res.status(200).json({user,accessToken})
    }
catch(err){
  res.status(500).json(err   )
}})

module.exports = router;