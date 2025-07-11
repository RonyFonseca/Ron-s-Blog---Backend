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
            type:String,
            ref: "User",
        }]
})

PostSchema.statics.findPostById = function (id) {
    return this.findById(id);
}

const Post = mongoose.model("Post", PostSchema);

export default Post; 