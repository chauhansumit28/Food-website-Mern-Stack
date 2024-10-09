const express = require("express");
const { logingUser, registerUser, getUserProfile, updateUserProfile, resetUser } = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", logingUser);
userRouter.get("/profile/:id", getUserProfile);
userRouter.put("/profile/:id", updateUserProfile);
userRouter.post("/reset", resetUser);

module.exports = userRouter;
