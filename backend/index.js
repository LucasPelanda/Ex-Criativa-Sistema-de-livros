
import express from "express";
import cors from "cors";
import livroRoutes from "./Routes/livros.js";
import leituraRoutes from "./Routes/leituras.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/livros", livroRoutes);
app.use("/leituras", leituraRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});