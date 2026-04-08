
import express from "express";
import { getLeituras, createLeitura } from "../Controllers/leituras.js";

const router = express.Router();

router.get("/:livroId", getLeituras);
router.post("/", createLeitura);

export default router;