import express from "express";

import UserController from "../controllers/user.controller.js";
import { userValidationMiddleware,loginValidationMiddleware } from "../../../middlewares/validation.middleware.js";

const userRoutes = express.Router();
const userController = new UserController();

userRoutes.post("/signup",userValidationMiddleware,userController.register)
userRoutes.post("/signin",loginValidationMiddleware,userController.login)



export default userRoutes;