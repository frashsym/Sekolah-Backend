import express from "express";
import {
  CreateAgenda,
  GetAllAgenda,
  GetAgendaById,
  UpdateAgenda,
  DeleteAgenda,
} from "../controller/AgendaController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/agenda", verifyToken, checkBlacklist, CreateAgenda);
router.get("/agenda", verifyToken, checkBlacklist, GetAllAgenda);
router.get("/agenda/:id", verifyToken, checkBlacklist, GetAgendaById);
router.put("/agenda/:id", verifyToken, checkBlacklist, UpdateAgenda);
router.delete("/agenda/:id", verifyToken, checkBlacklist, DeleteAgenda);

export default router;