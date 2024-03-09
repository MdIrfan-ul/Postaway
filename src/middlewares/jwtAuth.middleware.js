import jwt from "jsonwebtoken";

// Token Based Authentication for App for API Security
const jwtAuth = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send("UnAuthorized");
    }
    try {
        const payload = jwt.verify(token, "Ap#,*2IjKH'A71u");
        req.userId = payload.userId;
    } catch (error) {
        return res.status(401).send("UnAuthorized");
    }
    next();
};

export default jwtAuth;
