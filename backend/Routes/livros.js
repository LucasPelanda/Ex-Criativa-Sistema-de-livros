import express from "express";
import { getLivros, getLivro, createLivro, updateLivro, deleteLivro } from "../Controllers/livros.js";

const router = express.Router();

router.get("/", getLivros);
router.get("/:id", getLivro);
router.post("/", createLivro);
router.put("/:id", updateLivro);
router.delete("/:id", deleteLivro);

export default router;