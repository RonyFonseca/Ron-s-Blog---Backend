import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        name:{
            type: String, 
            required: true,
        },
        age:{
            type: Number,
            required: true,
        },
        email:{
            type: String,
            required: true, 
        },
        password:{
            type: String, 
            required: true,
        }
    }, {timestamps: true}
)

UserSchema.statics.findUserByEmail = function (email) {
    return this.findOne({email});
};

const User = mongoose.model("User", UserSchema);

export default User;