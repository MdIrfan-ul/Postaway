import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next)=>{
    // 1. Read token
    const token  = req.headers["authorization"];

    // 2. If no token return error

    if(!token){
        res.status(401).send("UnAuthorized");
    }

    // 3.Check  if the token is valid

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = payload.userID;
    } catch (error) {
        return res.status(401).send("UnAuthorized");
    }
    // 4. Call the next Middleware
    next();
}

export default jwtAuth;