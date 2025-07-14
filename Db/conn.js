import mongoose from "mongoose"; 
import dotenv from "dotenv";

dotenv.config({quiet: true});

const main = async() => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("🟢 - conectou ao banco !")
    }catch(err){
        console.log("🔴 - "+err)
    }
}

main()

export default mongoose; 