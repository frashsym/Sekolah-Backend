import express from "express";
import {
  CreateMenu,
  GetAllMenu,
  GetMenuById,
  UpdateMenu,
  DeleteMenu,
} from "../controller/MenuController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/menu", verifyToken, checkBlacklist, CreateMenu);
router.get("/menu", verifyToken, checkBlacklist, GetAllMenu);
router.get("/menu/:id", verifyToken, checkBlacklist, GetMenuById);
router.put("/menu/:id", verifyToken, checkBlacklist, UpdateMenu);
router.delete("/menu/:id", verifyToken, checkBlacklist, DeleteMenu);

export default router;
