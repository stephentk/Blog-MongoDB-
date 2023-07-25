const router  = require("express").Router()
const User = require("../models/user")
const { verifyToken, verifyTokenAuthorization } = require("./verifyToken")

router.put("/:id",verifyTokenAuthorization, async (req,res) => {
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
     }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,{
                $set:req.body
            },
            {new:true}
        )
    }catch (err) {
        res.status(500).json(err)
    }
}  )

router.delete("/:id",verifyTokenAuthorization,async(req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    }
catch(err){
     res.status(500).json(err)
}})


router.get("/:id",verifyTokenAuthorization,async(req,res) => {
    try {
       const user= await User.findById(req.params.id)
        res.status(200).json(user)
    }
catch(err){
     res.status(500).json(err)
}})


router.get("/",async(req,res) => {
    try {
       const users= await User.find(req.params.id)
        res.status(200).json(users)
    }
catch(err){
     res.status(500).json(err)
}})
module.exports = router