import express from "express";
import fs from "fs";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


const readData = () => {
   try {
       const data = fs.readFileSync("./jasons/usuario.json");
       return JSON.parse(data);
   } catch (error) {
       console.error(error);
   }
};


const writeData = (data) => {
   try {
       fs.writeFileSync("./jasons/usuario.json", JSON.stringify(data));
   } catch (error) {
       console.error(error);
   }
};


app.get("/",(req,res)=>{//request = peticion
   /*res.send("Welcome to my firts API with Node.js");*/
   res.send("Welcome to my api");
});

//creamos un endpint per obtenir todos los usuarios
app.get("/usuario",(req,res)=>{
   const data = readData();
   res.json(data.usuario)
});
app.get("/usuario/:id_usuario",(req,res)=>{
   const data=readData();
   //Extraiem l'id_usuario de l'url recordem que req es un objecte tipus requets
   // que conté l'atribut params i el podem consultar
   const id_usuario=parseInt(req.params.id_usuario);
   const usuario=data.usuario.find((usuario)=>usuario.id_usuario===id_usuario);
   res.json(usuario);
});
//Creem un endpoint del tipus post per afegir un llibre
app.post("/usuario",(req,res)=>{
   const data=readData();
   const body=req.body;
   const newusuario={ id_usuario:data.usuario.length+1,...body, //operacion de propagacion
   };
   data.usuario.push(newusuario);
   writeData(data);
   res.json(newusuario);
});
//update
app.put("/usuario/:id_usuario", (req, res) => {
   const data = readData();
   const body = req.body;
   const id_usuario = parseInt(req.params.id_usuario);
   const usuarioIndex = data.usuario.findIndex((usuario) => usuario.id_usuario === id_usuario);
   data.usuario[usuarioIndex] = {
   ...data.usuario[usuarioIndex],
   ...body,
   };
   writeData(data);
   res.json({ message: "usuario updated successfully" });
   });


//funcion para escuchar
app.listen(3000,()=>{
console.log("Server listing on port 3000")
});
//funcion para eliminar
app.delete("/usuario/:id_usuario", (req, res) => {
   const data = readData();
   const id_usuario = parseInt(req.params.id_usuario);
   // Filtramos para mantener solo los que NO coincidan con el id dado
   const newData = data.usuario.filter(usuario => usuario.id_usuario !== id_usuario);
   // Guardamos los cambios en el JSON
   writeData({ usuario: newData });
   res.json({ message: "Notificación eliminada correctamente" });
});

/*
Codigos que no estan en la presentacion
node index.js: para que salga el mensae de litening en el prto 3000
*/
