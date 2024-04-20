import express from "express";
const router = express();

import {
  getDate,
  selectLike,
  postLike,
  addLike,
} from "../controllers/ControllerProject.js";
import path from "path";
const __dirname = import.meta.dirname;

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

//prueba de conexión a la base de datos
router.get("/fecha", async (req, res) => {
  const FechaHora = await getDate();
  res.json({ fecha: FechaHora });
});

//create
router.post("/post", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  const datos = [titulo, img, descripcion];
  const Like = await postLike(datos);
  res.status(200).send("enviado");
});

//read
router.get("/posts", async (req, res) => {
  const Like = await selectLike();
  res.json(Like);
});

router.put("/post/:id", async (req, res) => {
  const { id } = req.params;
  const Like = await addLike(id);
  res.json(Like);
});

router.get("*", (req, res) => res.send("ruta no encontrada"));

export default router;
