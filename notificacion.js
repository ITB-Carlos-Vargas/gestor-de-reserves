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


app.get("/",(req,res)=>{
   res.send("Welcome to my api");
});


app.get("/notificacion",(req,res)=>{
   const data = readData();
   res.json(data.notificacion)
});
app.get("/notificacion/:id_notificacion",(req,res)=>{
   const data=readData();

   const id_notificacion=parseInt(req.params.id_notificacion);
   const notificacion=data.notificacion.find((notificacion)=>notificacion.id_notificacion===id_notificacion);
   res.json(notificacion);
});



app.post("/notificacion",(req,res)=>{
   const data=readData();
   const body=req.body;

   const newnotificacion={
   id_notificacion:data.notificacion.length+1,
   ...body, 
   };
   data.notificacion.push(newnotificacion);
   writeData(data);
   res.json(newnotificacion);
});

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

app.listen(3000,()=>{
console.log("Server listing on port 3000")
});

app.delete("/notificacion/:id_notificacion", (req, res) => {
   const data = readData();
   const id_notificacion = parseInt(req.params.id_notificacion);

   const newData = data.notificacion.filter(notificacion => notificacion.id_notificacion !== id_notificacion);

   writeData({ notificacion: newData });
   res.json({ message: "Notificación eliminada correctamente" });
});

