import User from "../Models/User.js";
import validar from "../helpers/Validations.js" //Helper para validar coisas básicas como se o nome veio, etc...
import encryption from "../helpers/Bcrypt.js" //Helper para encriptar ou comparar senhas criptografadas
import token from "../helpers/Token.js" //Helper para criar/verificar tokens

class UserController{
    static async createUser(req, res){
        const {name, email, age, password, confirmPassword} = req.body;

        const validacao = validar(res, name, age, email, password, confirmPassword);

        const userExist = await User.findUserByEmail(email);

        if(userExist){
            res.status(400).json({message: "🔴 - Já existe um usuário com este email !"}); 
            return
        }

        if(!validacao){
            res.status(400).json({message: "🔴 - Ocorreu algum erro nas validações"});
            return;
        }

        if(password != confirmPassword){
            res.status(400).json({message: "🔴 - As senhas estão diferentes !"}); 
            return
        }


        const newPasswordEncrypted = await encryption.encryptedPassword(password);

        const user = new User({
            name,
            age, 
            email, 
            password: newPasswordEncrypted,
        })

        try{
            const newUser = await user.save(); 
            token.createToken(newUser, res);
        }catch(err){
            res.status(400).json({message:err})
        }
    }
}

export default UserController;