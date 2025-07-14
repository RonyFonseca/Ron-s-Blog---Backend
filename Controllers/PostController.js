import Post from "../Models/Post.js"; 
import token from "../helpers/Token.js";

class PostController{

    static async deletePost(req, res){
        const {idPost} = req.params;


        const post = await Post.findById({_id:idPost});

        if(!post){
            res.status(400).json({message: "🔴 - O post não foi encontrado !"}); 
            return; 
        }

        const user = await token.getUserByToken(req, res);

        if(post.postOwner._id != user.id){
            res.status(400).json({message: "🔴 - Este post não é seu !"}); 
            return;
        }

        try{
            await Post.findByIdAndDelete(idPost);
            res.status(200).json({message:"Post deletado"});
        }catch(err){
            res.status(400).json({message:"Erro no save", erro: err});
        }
    }

    static async getSavedPosts(req, res){
        const user = await token.getUserByToken(req, res);

        try{
            const mySaves = await Post.find({saved: user.id}); 
            res.status(200).json({message:"Posts encontrados:", mySaves})
        }catch(err){
            res.status(400).json({message:"Erro no procurar salvos", erro: err});
        }
    } // Pegar meus posts salvos

    static async savePost(req, res){
        const {idPost} = req.params;

        const post = await Post.findById({_id:idPost});

        if(!post){
            res.status(400).json({message: "🔴 - O post não foi encontrado !"}); 
            return; 
        }

        const user = await token.getUserByToken(req, res);

        let msg = ""; 
        let save = false; 
        for(let i=0; i<post.saved.length; i++){
            if(post.saved[i] == user.id){
                save = true;
                post.saved.splice(i, 1);
                msg = "Salvo removido";
            }
        }

        if(!save){
            post.saved.push(user.id);
            msg = "Savo adicionado";
        }

        try{
            post.save(); 
            res.status(200).json({message: msg});
        }catch(err){
            res.status(400).json({message:"Erro no save", erro: err});
        }
    }

    static async comentPost(req, res){
        const {idPost} = req.params;
        const {contentComent} = req.body;

        if(!contentComent){
            res.status(400).json("🔴 - O comentário está sem conteúdo !");
            return;
        }

        const post = await Post.findById({_id:idPost});

        if(!post){
            res.status(400).json({message: "🔴 - O post não foi encontrado !"}); 
            return; 
        }

        const user = await token.getUserByToken(req, res);

        const coment = {
            userEmail: user.email,
            contentComent,
        }

        try{
            post.coments.push(coment); 
            post.save(); 
            res.status(200).json({message: "Comentário feito"});
        }catch(err){
            res.status(400).json({message:"Erro no comentário", erro: err});
        }

    }

    static async likedPost(req, res){
        const {idPost} = req.params;
        
        const post = await Post.findById({_id:idPost});

        if(!post){
            res.status(400).json({message: "🔴 - O post não foi encontrado !"}); 
            return; 
        }
        
        const user = await token.getUserByToken(req, res);

        let msg = ""; 
        let like = false; 
        for(let i=0; i<post.likes.length; i++){
            if(post.likes[i] == user.id){
                like = true;
                post.likes.splice(i, 1);
                msg = "Like removido";
            }
        }

        if(!like){
            post.likes.push(user.id);
            msg = "Like adicionado";
        }

        try{
            post.save(); 
            res.status(200).json({message: msg});
        }catch(err){
            res.status(400).json({message:"Erro no like", erro: err});
        }



    }

    static async editPost(req, res){
        const {id} = req.params
        const {title, content} = req.body; 

        const post = await Post.findById({_id:id});

        if(!post){
            res.status(400).json({message: "🔴 - O post não foi encontrado !"}); 
            return; 
        }

        const user = await token.getUserByToken(req, res);

        if(post.postOwner._id != user.id){
            res.status(400).json({message: "🔴 - Este post não é seu !"}); 
            return;
        }

        if(!title){
            res.status(400).json({message: "🔴 - O campo titulo está sem nada !"}); 
            return; 
        }

        if(title != post.title){
            post.title = title; 
        }

        if(!content){
            res.status(400).json({message: "🔴 - O campo conteúdo está sem nada !"}); 
            return; 
        }

        if(content != post.content){
            post.content = content; 
        }

        try{
            const postUpdated = await post.save(); 
            res.status(200).json({message: "🟢 - Post atualizado com sucesso", postUpdated})
        }catch(err){
            res.status(400).json({message: "🔴 - Erro no momento da atualização do post", erro: err.message}); 
        }


    }

    static async createPost(req, res){
        const {title, content} = req.body; 

        const user = await token.getUserByToken(req, res);

        if(!title){
            res.status(400).json({message: "🔴 - O campo titulo está sem nada !"}); 
            return; 
        }

        if(!content){
            res.status(400).json({message: "🔴 - O campo conteúdo está sem nada !"}); 
            return; 
        }

        const post = new Post({
            title, 
            content, 
            like:[], 
            coments:[],
            saved:[],
            postOwner: {
                _id: user._id,
                name: user.name, 
                email: user.email,
            },
        })

        try{
            const newPost = await post.save();
            res.status(200).json({message: "🟢 - Post criado com sucesso", newPost}); 
        }catch(err){
            res.status(400).json({message: "🔴 - Erro no momento da criação do post", erro: err.message})
        }

    }
}

export default PostController;