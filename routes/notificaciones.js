import fs from "fs";
import express from "express";

const router = express.Router();

const readNotificaciones = () => {
    try {
        const data = fs.readFileSync("./jasons/notificacion.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
 };
 
 
 const writeNotificaciones = (data) => {
    try {
        fs.writeFileSync("./jasons/notificacion.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
 };


//creamos un endpoint per obtenir todos los usuarios
router.get("/",(req,res)=>{
   const htmlMessage = `<a href="http://localhost:3000/">HOME</a>`;
   const data = readNotificaciones();
   res.render("notificacion",{data, htmlMessage})
});




 export default router;