import express from "express";
import {
  CreateSekilasInfo,
  GetAllSekilasInfo,
  GetSekilasInfoById,
  UpdateSekilasInfo,
  DeleteSekilasInfo,
} from "../controller/SekilasInfoController.js";

const router = express.Router();

router.post("/sekilas-info", CreateSekilasInfo);
router.get("/sekilas-info", GetAllSekilasInfo);
router.get("/sekilas-info/:id", GetSekilasInfoById);
router.put("/sekilas-info/:id", UpdateSekilasInfo);
router.delete("/sekilas-info/:id", DeleteSekilasInfo);

export default router;