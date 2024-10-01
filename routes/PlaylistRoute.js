import express from "express";
import {
  CreatePlaylist,
  GetAllPlaylists,
  GetPlaylistById,
  UpdatePlaylist,
  DeletePlaylist,
} from "../controller/PlaylistController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/playlist", verifyToken, checkBlacklist, CreatePlaylist);
router.get("/playlist", verifyToken, checkBlacklist, GetAllPlaylists);
router.get("/playlist/:id", verifyToken, checkBlacklist, GetPlaylistById);
router.put("/playlist/:id", verifyToken, checkBlacklist, UpdatePlaylist);
router.delete("/playlist/:id", verifyToken, checkBlacklist, DeletePlaylist);

export default router;