import User from "../Models/User.js";
import encryption from "../helpers/Bcrypt.js" //Helper para encriptar ou comparar senhas criptografadas
import token from "../helpers/Token.js" //Helper para criar/verificar tokens

class UserController{

    static async deleteUser(req, res){
        const {password} = req.body;

        if(!password){
            res.status(400).json({message: "🔴 - O campo de senha está sem nada !"});
            return;
        }

        const user = await token.getUserByToken(req, res);

        const confirmPassword = await encryption.confirmEncryptedPassword(password, user.password);

        if(!confirmPassword){
            res.status(400).json({message: "🔴 - A senha não condiz com a sua cadastrada !"});
            return;
        }

        try{
            await User.findByIdAndDelete(user.id);
            res.status(200).json({message: "🟢 - Usuário removido !"});
        }catch(err){
            res.status(400).json({message: err});
            return;
        }
    }

    static async editUser(req, res){
        const {name, age, password, confirmPassword} = req.body;


        const user = await token.getUserByToken(req, res);

        if(!name){
            res.status(400).json({message: "🔴 - O campo nome está sem nada !"});
            return;
        }

        if(name != user.name){
            user.name = name; 
        }

         if(!age){
            res.status(400).json({message: "🔴 - O campo idade está sem nada !"});
            return;
        }

        if(age != user.age){
            user.age = age; 
        }

        if(!password){
            res.status(400).json({message: "🔴 - O campo de senha está sem nada !"});
            return;
        }

        if(!confirmPassword){
            res.status(400).json({message: "🔴 - O campo de confirmação de senha está sem nada !"});
            return;
        }

        if(password != confirmPassword){
            res.status(400).json({message: "🔴 - As senhas estão diferentes !"}); 
            return
        }

        const confirmPasswordEncrypted = await encryption.confirmEncryptedPassword(password, user.password); //Ver se a senha é diferente da que ja existe no banco

        if(!confirmPasswordEncrypted){
            const newPassword = await encryption.encryptedPassword(password);
            user.password = newPassword;
        }

        try{
            await user.save(); 
            res.status(201).json({message: "🟢 - Usuário atualizado !"}); 
            return
        }catch(err){
            res.status(400).json({message: err})
        }
    }

    static async loginUser(req, res){
        const {email, password} = req.body;

        if(!email){
            res.status(400).json({message: "🔴 - O campo email está sem nada !"});
            return;
        }

        if(!password){
            res.status(400).json({message: "🔴 - O campo de senha está sem nada !"});
            return;
        }

        const userExist = await User.findUserByEmail(email);

        if(!userExist){
            res.status(400).json({message: "🔴 - Este usuário não existe !"});
            return;
        }

        const confirmPassword = await encryption.confirmEncryptedPassword(password, userExist.password);

        if(!confirmPassword){
            res.status(400).json({message: "🔴 - Senha inválida !"});
            return;
        }

        try{
            token.createToken(userExist, res);
        }catch(err){
            res.status(400).json({message: err});
            return;
        }

    }

    static async createUser(req, res){
        const {name, email, age, password, confirmPassword} = req.body;

        if(!name){
            res.status(400).json({message: "🔴 - O campo nome está sem nada !"});
            return;
        }

        if(!email){
            res.status(400).json({message: "🔴 - O campo email está sem nada !"});
            return;
        }

        if(!password){
            res.status(400).json({message: "🔴 - O campo de senha está sem nada !"});
            return;
        }

        if(!confirmPassword){
            res.status(400).json({message: "🔴 - O campo de confirmação de senha está sem nada !"});
            return;
        }

        if(!age){
            res.status(400).json({message: "🔴 - O campo idade está sem nada !"});
            return;
        }


        const userExist = await User.findUserByEmail(email);

        if(userExist){
            res.status(400).json({message: "🔴 - Já existe um usuário com este email !"}); 
            return
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