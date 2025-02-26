import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


const readData = () => {
   try {
       const data = fs.readFileSync("./reserva.json");
       return JSON.parse(data);
   } catch (error) {
       console.error(error);
   }
};


const writeData = (data) => {
   try {
       fs.writeFileSync("./reserva.json", JSON.stringify(data));
   } catch (error) {
       console.error(error);
   }
};


app.get("/",(req,res)=>{//request = peticion
   /*res.send("Welcome to my firts API with Node.js");*/
   res.send("Welcome to my api");
});

//creamos un endpint per obtenir todos los reservas
app.get("/reserva",(req,res)=>{
   const data = readData();
   res.json(data.reserva)
});
app.get("/reserva/:id_reserva",(req,res)=>{
   const data=readData();
   //Extraiem l'id_reserva de l'url recordem que req es un objecte tipus requets
   // que conté l'atribut params i el podem consultar
   const id_reserva=parseInt(req.params.id_reserva);
   const reserva=data.reserva.find((reserva)=>reserva.id_reserva===id_reserva);
   res.json(reserva);
});
//Creem un endpoint del tipus post per afegir un llibre


app.post("/reserva",(req,res)=>{
   const data=readData();
   const body=req.body;
   //todo lo que viene en ...body se agrega al nuevo libro
   const newreserva={
   id_reserva:data.reserva.length+1,
   ...body, //operacion de propagacion
   };
   data.reserva.push(newreserva);
   writeData(data);
   res.json(newreserva);
});
//update
app.put("/reserva/:id_reserva", (req, res) => {
   const data = readData();
   const body = req.body;
   const id_reserva = parseInt(req.params.id_reserva);
   const reservaIndex = data.reserva.findIndex((reserva) => reserva.id_reserva === id_reserva);
   data.reserva[reservaIndex] = {
   ...data.reserva[reservaIndex],
   ...body,
   };
   writeData(data);
   res.json({ message: "reserva updated successfully" });
   });


//funcion para escuchar
app.listen(3000,()=>{
console.log("Server listing on port 3000")
});

/*
Codigos que no estan en la presentacion
node index.js: para que salga el mensae de litening en el prto 3000
*/
