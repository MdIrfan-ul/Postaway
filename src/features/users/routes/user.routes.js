import express from "express";

import UserController from "../controllers/user.controller.js";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/signup",userController.register)
userRoutes.post("/signin",userController.login)



export default userRoutes;