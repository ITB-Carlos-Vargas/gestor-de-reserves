import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


const readData = () => {
   try {
       const data = fs.readFileSync("./jasons/notificacion.json");
       return JSON.parse(data);
   } catch (error) {
       console.error(error);
   }
};


const writeData = (data) => {
   try {
       fs.writeFileSync("./jasons/notificacion.json", JSON.stringify(data));
   } catch (error) {
       console.error(error);
   }
};


app.get("/",(req,res)=>{//request = peticion
   /*res.send("Welcome to my firts API with Node.js");*/
   res.send("Welcome to my api");
});

//creamos un endpint per obtenir todos los notificacions
app.get("/notificacion",(req,res)=>{
   const data = readData();
   res.json(data.notificacion)
});
app.get("/notificacion/:id_notificacion",(req,res)=>{
   const data=readData();
   //Extraiem l'id_notificacion de l'url recordem que req es un objecte tipus requets
   // que conté l'atribut params i el podem consultar
   const id_notificacion=parseInt(req.params.id_notificacion);
   const notificacion=data.notificacion.find((notificacion)=>notificacion.id_notificacion===id_notificacion);
   res.json(notificacion);
});
//Creem un endpoint del tipus post per afegir un llibre


app.post("/notificacion",(req,res)=>{
   const data=readData();
   const body=req.body;
   //todo lo que viene en ...body se agrega al nuevo libro
   const newnotificacion={
   id_notificacion:data.notificacion.length+1,
   ...body, //operacion de propagacion
   };
   data.notificacion.push(newnotificacion);
   writeData(data);
   res.json(newnotificacion);
});
//update
app.put("/notificacion/:id_notificacion", (req, res) => {
   const data = readData();
   const body = req.body;
   const id_notificacion = parseInt(req.params.id_notificacion);
   const notificacionIndex = data.notificacion.findIndex((notificacion) => notificacion.id_notificacion === id_notificacion);
   data.notificacion[notificacionIndex] = {
   ...data.notificacion[notificacionIndex],
   ...body,
   };
   writeData(data);
   res.json({ message: "notificacion updated successfully" });
   });


//funcion para escuchar
app.listen(3000,()=>{
console.log("Server listing on port 3000")
});
//funcion para eliminar
app.delete("/notificacion/:id_notificacion", (req, res) => {
   const data = readData();
   const id_notificacion = parseInt(req.params.id_notificacion);
   // Filtramos para mantener solo los que NO coincidan con el id dado
   const newData = data.notificacion.filter(notificacion => notificacion.id_notificacion !== id_notificacion);
   // Guardamos los cambios en el JSON
   writeData({ notificacion: newData });
   res.json({ message: "Notificación eliminada correctamente" });
});


/*
Codigos que no estan en la presentacion
node index.js: para que salga el mensae de litening en el prto 3000
*/
