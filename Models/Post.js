import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true, 
        },
        content:{
            type:String,
            required:true,
        },
        likes:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }], 
        coments:[{
            type: Object,
            ref: "User",
        }],
        saved:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        postOwner:{
            type: Object, 
            ref: "User",
        }
}, {timestamps: true});


const Post = mongoose.model("Post", PostSchema);

export default Post; 