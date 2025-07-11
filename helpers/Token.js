import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config();

class token {
    static createToken(user, res){
        try{
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                id: user._id,
            },process.env.KEY_SECRET_TOKEN, {expiresIn: '1d'}); 

            res.status(201).json({message: "✔ - Token criado com sucesso", token})
        }catch(err){
            res.status(500).json({message: err})
        }
    }

    static async getUserByToken(req, res){
        const token = req.headers.authorization; 

        if(!token){
            res.status(400).json({message:"🔴 - Token ausente ou malformado!"});
            return;
        }

        try{
            const tokenDecoded = jwt.verify(token, process.env.KEY_SECRET_TOKEN);

            const user = await User.findById(tokenDecoded.id);

            if(!user){
                return res.status(404).json({ message: "🔴 - Usuário não encontrado!" });
            }
            
            res.status(200).json({message: "🟢 - Usuário encontrado", user});
        }catch(err){
            res.status(500).json({message: err}); 
        }

    }
}

export default token; 