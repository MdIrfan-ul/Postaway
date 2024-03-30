import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import { uploadFile } from "../../middlewares/file-upload.middleware.js";

const UserRoutes = express.Router();
const userController = new UserController();

// Authentication Routes
UserRoutes.post("/signup", (req, res) => {
  userController.register(req, res);
});
UserRoutes.post("/signin", (req, res, next) => {
  userController.login(req, res, next);
});
UserRoutes.get("/logout", jwtAuth, (req, res) => {
  userController.logout(req, res);
});
UserRoutes.get("/logout-all-devices", jwtAuth, (req, res) => {
  userController.logoutAll(req, res);
});

// User Profile Routes
UserRoutes.get("/get-details/:userId", jwtAuth, (req, res) => {
  userController.getUser(req, res);
});
UserRoutes.get("/get-all-details", jwtAuth, (req, res) => {
  userController.getAllUser(req, res);
});
UserRoutes.put(
  "/update-details/:userId",
  jwtAuth,
  uploadFile.single("avatar"),
  (req, res) => {
    userController.updateUser(req, res);
  }
);

export default UserRoutes;
