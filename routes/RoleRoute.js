import express from "express";
import {
  CreateRole,
  GetAllRoles,
  GetRoleById,
  UpdateRole,
  DeleteRole,
} from "../controller/RoleController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/role", verifyToken, checkBlacklist, CreateRole);
router.get("/role", verifyToken, checkBlacklist, GetAllRoles);
router.get("/role/:id", verifyToken, checkBlacklist, GetRoleById);
router.put("/role/:id", verifyToken, checkBlacklist, UpdateRole);
router.delete("/role/:id", verifyToken, checkBlacklist, DeleteRole);

export default router;
