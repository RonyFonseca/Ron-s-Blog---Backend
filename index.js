import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";

//CONEXÃO COM BANCO
import conn from "./Db/conn.js";

//ROTAS
import UserRoutes from "./Routes/UserRoutes.js";
import PostRoutes from "./Routes/PostRoutes.js";

const app = new express(); 
dotenv.config(); 

app.use(cors())

app.use(express.json());

//ROTAS 
app.use("/users", UserRoutes); 
app.use("/posts", PostRoutes);

app.listen(process.env.PORT, () => {
    console.log("🚀 - O servidor está rodando na porta:",process.env.PORT);
})
