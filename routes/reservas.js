import fs from "fs";
import express from "express";

const router = express.Router();

const readReservas = () => {
    try {
        const data = fs.readFileSync("./jasons/reserva.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
 };
 
 
 const writeReservas = (data) => {
    try {
        fs.writeFileSync("./jasons/reserva.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
 };


//creamos un endpoint per obtenir todos los usuarios
router.get("/",(req,res)=>{
   const data = readReservas();
   res.render("reserva",{data})
});

 export default router;