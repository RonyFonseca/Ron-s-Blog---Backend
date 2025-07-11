const validar = (res, name, age, email, password, confirmPassword) => {
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

    return true;

}

export default validar;