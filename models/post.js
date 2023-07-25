const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")

const postSchema = new mongoose.Schema({
    title: {type:String,required:true,unique:true},
    content: {type:String,required:true,unique:true},
    author:{type:String,required:true},
    publicationdate:{type:String,required:true}
},
{timestamps:true})

module.exports = mongoose.model("Post",postSchema)