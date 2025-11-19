import express from "express";
import {
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/logout", logoutUser);

export default router;
