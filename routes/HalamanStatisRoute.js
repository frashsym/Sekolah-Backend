import express from "express";
import {
  CreateHalamanStatis,
  GetAllHalamanStatis,
  GetHalamanStatisById,
  UpdateHalamanStatis,
  DeleteHalamanStatis,
} from "../controller/HalamanStatisController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/halaman-statis", verifyToken, checkBlacklist, CreateHalamanStatis);
router.get("/halaman-statis", verifyToken, checkBlacklist, GetAllHalamanStatis);
router.get("/halaman-statis/:id", verifyToken, checkBlacklist, GetHalamanStatisById);
router.put("/halaman-statis/:id", verifyToken, checkBlacklist, UpdateHalamanStatis);
router.delete("/halaman-statis/:id", verifyToken, checkBlacklist, DeleteHalamanStatis);

export default router;