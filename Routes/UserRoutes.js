import UserController from "../Controllers/UserController.js";
import express from "express";

const router = express.Router(); 

router.post("/createUser", UserController.createUser);

export default router; 