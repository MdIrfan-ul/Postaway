import express from "express";

<<<<<<< HEAD
import postRoutes from "./src/features/posts/routes/post.routes.js";
import userRoutes from "./src/features/users/routes/user.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Postaway");
})

app.use("/api/posts",jwtAuth,postRoutes);
app.use("/api/user",userRoutes);

export default app;
=======
const app = express();
>>>>>>> fbc22a4db6cfe7bf5132ffdeff1c61c421b70920
