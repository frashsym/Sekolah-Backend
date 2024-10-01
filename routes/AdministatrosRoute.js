import express from "express";
import { login, logout } from "../controller/AdministatorController.js";
import { checkBlacklist } from "../middleware/Blacklist.js";
const router = express.Router();

router.post("/login", login);
router.delete("/logout", checkBlacklist, logout);

export default router;
