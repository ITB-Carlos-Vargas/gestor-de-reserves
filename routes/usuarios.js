import fs from "fs";
import express from "express";

const router = express.Router();

const readUsuarios = () => {
    try {
        const data = fs.readFileSync("./jasons/usuario.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
 };
 
 
 const writeUsuarios = (data) => {
    try {
        fs.writeFileSync("./jasons/usuario.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
 };


//creamos un endpoint per obtenir todos los usuarios
router.get("/",(req,res)=>{

   const user={name:"Carlos"}
   const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p> <a href="http://localhost:3000/">Visita Example</a>`;
   const data = readUsuarios();
   res.render("usuario",{user, data, htmlMessage})
});
router.get("/:id_usuario",(req,res)=>{
   const data=readUsuarios();

   const id_usuario=parseInt(req.params.id_usuario);
   const usuario=data.usuario.find((usuario)=>usuario.id_usuario===id_usuario);
   res.json(usuario);
});
//Creem un endpoint del tipus post per afegir un llibre
router.post("/",(req,res)=>{
   const data=readUsuarios();
   const body=req.body;
   const newusuario={ id_usuario:data.usuario.length+1,...body, //operacion de propagacion
   };
   data.usuario.push(newusuario);
   writeUsuarios(data);
   res.json(newusuario);
});
//update
router.put("/:id_usuario", (req, res) => {
   const data = readUsuarios();
   const body = req.body;
   const id_usuario = parseInt(req.params.id_usuario);
   const usuarioIndex = data.usuario.findIndex((usuario) => usuario.id_usuario === id_usuario);
   data.usuario[usuarioIndex] = {
   ...data.usuario[usuarioIndex],
   ...body,
   };
   writeUsuarios(data);
   res.json({ message: "usuario updated successfully" });
   });

   //funcion para eliminar
router.delete("/:id_usuario", (req, res) => {
    const data = readUsuarios();
    const id_usuario = parseInt(req.params.id_usuario);
    // Filtramos para mantener solo los que NO coincidan con el id dado
    const newData = data.usuario.filter(usuario => usuario.id_usuario !== id_usuario);
    // Guardamos los cambios en el JSON
    writeUsuarios({ usuario: newData });
    res.json({ message: "Notificación eliminada correctamente" });
 });
 export default router;