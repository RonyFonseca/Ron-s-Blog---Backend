import UserController from "../Controllers/UserController.js";
import token from "../helpers/Token.js"; //Helper para checar se o usuário tem o token
import express from "express";

const router = express.Router(); 

router.post("/createUser", UserController.createUser);
router.post("/loginUser", UserController.loginUser);
router.put("/editUser", token.checkToken, UserController.editUser);
router.delete("/deleteUser", token.checkToken, UserController.deleteUser);

export default router; 