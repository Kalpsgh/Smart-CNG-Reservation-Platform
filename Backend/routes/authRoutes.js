import express from "express";

import {
  register,
  login,
  ownerRegister
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", register);

router.post("/login", login);
router.post("/signup-owner", ownerRegister);
export default router;