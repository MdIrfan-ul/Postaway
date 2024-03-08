import UserModel from "../models/user.models.js";
import jwt from "jsonwebtoken";
export default class UserController{

    register(req,res,next){
        const {name,email,password} = req.body;
        let newUser = UserModel.add(name,email,password);
        res.status(201).send(newUser);
    }

    login(req,res,next){
        const email = req.body.email;
        const password = req.body.password;
        try {
            let isvalidUser = UserModel.isvalidUser(email,password);
        if(isvalidUser){
            const token = jwt.sign({userId:isvalidUser.id,email:isvalidUser.email},"Ap#,*2IjKH'A71u",{expiresIn:"1h"})
            res.status(200).send(token);
        }
        } catch (error) {
            next(error);
        }
        
    }
}