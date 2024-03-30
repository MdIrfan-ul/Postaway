import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const UserRoutes = express.Router();
const userController = new UserController();

UserRoutes.post("/signup",(req,res)=>{
    userController.register(req,res);
});
UserRoutes.post("/signin",(req,res,next)=>{
    userController.login(req,res,next);
});
UserRoutes.get("/logout",jwtAuth,(req,res)=>{
    userController.logout(req,res);
});
UserRoutes.get("/logout-all-devices",jwtAuth,(req,res)=>{
    userController.logoutAll(req,res);
});
UserRoutes.get("/get-details/:userId",(req,res)=>{
    userController.getUser(req,res);
});
UserRoutes.get("/get-details",(req,res)=>{
    userController.getAllUser(req,res);
});
UserRoutes.put("/update-details/:userId",jwtAuth,(req,res)=>{
    userController.updateUser(req,res);
});

export default UserRoutes;