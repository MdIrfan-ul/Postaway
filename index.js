// External Modules

import express from "express";
import swagger from "swagger-ui-express";

// Internal Modules
import postRoutes from "./src/features/posts/routes/post.routes.js";
import userRoutes from "./src/features/users/routes/user.routes.js";
import commentRoutes from "./src/features/comments/routes/comment.routes.js";
import likeRoutes from "./src/features/likes/routes/likes.routes.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import apiDocs from "./swagger.json" assert { type: "json" };

import ApplicationError from "./src/middlewares/application.error.middleware.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Postaway");
});
// API's for the app
app.use("/api/docs", swagger.serve, swagger.setup(apiDocs));
app.use("/api/posts", jwtAuth, postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", jwtAuth, commentRoutes);
app.use("/api/likes", jwtAuth, likeRoutes);

// Error Handling Middlewares
app.use((err, req, res, next) => {
  console.log(err);

  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }
  res.status(500).send("something went wrong");
});

app.use((req, res) => {
  res
    .status(404)
    .json(
      "API not found for the request. Please verify the document to know more information at localhost:8000/api/docs"
    );
});

export default app;
