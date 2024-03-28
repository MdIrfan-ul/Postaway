import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async register(req,res){
        try {
            let {name,email,password,gender} = req.body;
            password = await bcrypt.hash(password,12);
            const newUser = {name,email,password,gender}
            await this.userRepository.register(newUser);
          res.status(201).send(newUser);

        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    async login(req,res,next){
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await this.userRepository.login(email);
            if(!user){
                return res.status(400).send("Invalid Email");
            }
            else{
                const passwordMatch = await bcrypt.compare(password,user.password);
                console.log("PasswordMatch Result:",passwordMatch);
                if(passwordMatch){
                    const token = jwt.sign({userID:user._id,userEmail:user.email},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
                return res.status(200).send(token);}else{
                    return res.status(400).send("Invalid Credentials");
                }
            }
        } catch (error) {
           next(error)
        }
    }
    async logout(req,res){
        try {
            
        } catch (error) {
            
        }
    }
    async logoutAll(req,res){
        try {
            
        } catch (error) {
            
        }
    }
    async getUser(req,res){try {
        
    } catch (error) {
        
    }}
    async getAllUser(req,res){try {
        
    } catch (error) {
        
    }}
    async updateUser(req,res){try {
        
    } catch (error) {
        
    }}
}