
const router  = require("express").Router()
const Post = require("../models/post")
const { verifyToken, verifyTokenAuthorization } = require("./verifyToken")


router.post("/",verifyToken,async(req,res) => {
    const newPost = new Post(req.body);
    try{ 
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    } catch(err){
        res.status(500).json(err)
    }
})
router.put("/:id",verifyToken, async (req,res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,{
                $set:req.body
            },
            {new:true}
        )
    }catch (err) {
        res.status(500).json(err)
    }
}  )

router.delete("/:id",verifyToken,async(req,res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    }
catch(err){
     res.status(500).json(err)
}})


router.get("/:id",verifyToken,async(req,res) => {
    try {
       const post = await Post.findById(req.params.id)
        res.status(200).json(user)
    }
catch(err){
     res.status(500).json(err)
}})


router.get("/",verifyToken,async(req,res) => {
    try {
       const post= await Post.find(req.params.id)
        res.status(200).json(users)
    }
catch(err){
     res.status(500).json(err)
}})
module.exports = router