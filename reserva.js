import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


const readData = () => {
   try {
       const data = fs.readFileSync("./jasons/reserva.json");
       return JSON.parse(data);
   } catch (error) {
       console.error(error);
   }
};


const writeData = (data) => {
   try {
       fs.writeFileSync("./jasons/reserva.json", JSON.stringify(data));
   } catch (error) {
       console.error(error);
   }
};


app.get("/",(req,res)=>{
   res.send("Welcome to my api");
});


app.get("/reserva",(req,res)=>{
   const data = readData();
   res.json(data.reserva)
});
app.get("/reserva/:id_reserva",(req,res)=>{
   const data=readData();
   const id_reserva=parseInt(req.params.id_reserva);
   const reserva=data.reserva.find((reserva)=>reserva.id_reserva===id_reserva);
   res.json(reserva);
});


app.post("/reserva",(req,res)=>{
   const data=readData();
   const body=req.body;
   const newreserva={
   id_reserva:data.reserva.length+1,
   ...body, 
   };
   data.reserva.push(newreserva);
   writeData(data);
   res.json(newreserva);
});
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



app.listen(3000,()=>{
console.log("Server listing on port 3000")
});

app.delete("/reserva/:id_reserva", (req, res) => {
   const data = readData();
   const id_reserva = parseInt(req.params.id_reserva);

   const newData = data.reserva.filter(reserva => reserva.id_reserva !== id_reserva);

   writeData({ reserva: newData });
   res.json({ message: "Reserva eliminada correctamente" });
});

