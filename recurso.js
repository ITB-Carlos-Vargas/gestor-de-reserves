import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


const readData = () => {
   try {
       const data = fs.readFileSync("./recurso.json");
       return JSON.parse(data);
   } catch (error) {
       console.error(error);
   }
};


const writeData = (data) => {
   try {
       fs.writeFileSync("./recurso.json", JSON.stringify(data));
   } catch (error) {
       console.error(error);
   }
};


app.get("/",(req,res)=>{//request = peticion
   /*res.send("Welcome to my firts API with Node.js");*/
   res.send("Welcome to my api");
});

//creamos un endpint per obtenir todos los recurso
app.get("/recurso",(req,res)=>{
   const data = readData();
   res.json(data.recurso)
});
app.get("/recurso/:id_recurso",(req,res)=>{
   const data=readData();
   //Extraiem l'id_recurso de l'url recordem que req es un objecte tipus requets
   // que conté l'atribut params i el podem consultar
   const id_recurso=parseInt(req.params.id_recurso);
   const recurso=data.recurso.find((recurso)=>recurso.id_recurso===id_recurso);
   res.json(recurso);
});
//Creem un endpoint del tipus post per afegir un llibre


app.post("/recurso",(req,res)=>{
   const data=readData();
   const body=req.body;
   //todo lo que viene en ...body se agrega al nuevo libro
   const newrecurso={
   id_recurso:data.recurso.length+1,
   ...body, //operacion de propagacion
   };
   data.recurso.push(newrecurso);
   writeData(data);
   res.json(newrecurso);
});
//update
app.put("/recurso/:id_recurso", (req, res) => {
   const data = readData();
   const body = req.body;
   const id_recurso = parseInt(req.params.id_recurso);
   const recursoIndex = data.recurso.findIndex((recurso) => recurso.id_recurso === id_recurso);
   data.recurso[recursoIndex] = {
   ...data.recurso[recursoIndex],
   ...body,
   };
   writeData(data);
   res.json({ message: "recurso updated successfully" });
   });


//funcion para escuchar
app.listen(3000,()=>{
console.log("Server listing on port 3000")
});

/*
Codigos que no estan en la presentacion
node index.js: para que salga el mensae de litening en el prto 3000
*/
