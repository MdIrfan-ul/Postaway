import express from "express";



import postRoutes from "./src/features/posts/routes/post.routes.js";
import userRoutes from "./src/features/users/routes/user.routes.js";
import commentRoutes from "./src/features/comments/routes/comment.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Postaway");
})

app.use("/api/posts",jwtAuth,postRoutes);
app.use("/api/user",userRoutes);
app.use("/api/comments",jwtAuth,commentRoutes);

export default app;





