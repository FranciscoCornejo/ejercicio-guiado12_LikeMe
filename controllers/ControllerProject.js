import { text } from "express";
import pool from "../config/db.js";

//probamos la coneccion
const getDate = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows[0].now);
    return result.rows;
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
    throw error;
  }
};
getDate();

const selectLike = async () => {
  try {
    const consulta = {
      text: "SELECT * FROM posts",
    };
    const respuesta = await pool.query(consulta);
    return respuesta.rows;
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
    throw error;
  }
};

const postLike = async (datos) => {
  try {
    const consulta = {
      text: "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *",
      values: datos,
    };
    const respuesta = await pool.query(consulta);
    return respuesta.rows;
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
  }
};

const addLike = async (id) => {
  try {
    const consulta = {
      text: "UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *",
      values: [id],
    };
    const respuesta = await pool.query(consulta);
    return respuesta.rows;
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
  }
};

export { getDate, selectLike, postLike, addLike };
