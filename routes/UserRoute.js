import express from "express";
import {
  CreateUser,
  DeleteUser,
  GetUserById,
  GetUsers,
  UpdateUser,
} from "../controller/UserController.js";
const router = express.Router();
import upl_user from "../middleware/user.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

router.get("/users", verifyToken, checkBlacklist, GetUsers);
// router.post("/createuser", upl_user.single("foto"), CreateUser);
router.post("/createuser", CreateUser);
router.get("/user/:id", verifyToken, checkBlacklist, GetUserById);
router.patch("/updateuser/:id", verifyToken, checkBlacklist, UpdateUser);
router.delete("/deleteuser/:id", verifyToken, checkBlacklist, DeleteUser);
// verifyToken, checkBlacklist,
export default router;
