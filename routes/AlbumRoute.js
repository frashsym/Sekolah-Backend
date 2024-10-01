import express from "express";
import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from "../controller/AlbumController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/album", verifyToken, checkBlacklist, createAlbum);
router.get("/album", verifyToken, checkBlacklist, getAllAlbums);
router.get("/album/:id", verifyToken, checkBlacklist, getAlbumById);
router.put("/album/:id", verifyToken, checkBlacklist, updateAlbum);
router.delete("/album/:id", verifyToken, checkBlacklist, deleteAlbum);

export default router;