import express from "express";
import {
  CreateUsersModul,
  GetAllUsersModul,
  GetUsersModulById,
  UpdateUsersModul,
  DeleteUsersModul,
} from "../controller/UsersModulController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/users-modul", verifyToken, checkBlacklist, CreateUsersModul);
router.get("/users-modul", verifyToken, checkBlacklist, GetAllUsersModul);
router.get("/users-modul/:id", verifyToken, checkBlacklist, GetUsersModulById);
router.put("/users-modul/:id", verifyToken, checkBlacklist, UpdateUsersModul);
router.delete("/users-modul/:id", verifyToken, checkBlacklist, DeleteUsersModul);

export default router;
