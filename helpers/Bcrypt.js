import bcrypt from "bcrypt";

class encryption {
    static async encryptedPassword (password){
        try{
            const salt = await bcrypt.genSalt(12); 
            const passwordHash = await bcrypt.hash(password, salt); 
            return passwordHash;
        }catch(err){
            console.log(err);
        }
    }

    static async confirmEncryptedPassword(passwordUser, passwordDb){
        try{
            return await bcrypt.compare(passwordUser, passwordDb); 
        }catch(err){
            console.log(err)
        }
    }
}

export default encryption