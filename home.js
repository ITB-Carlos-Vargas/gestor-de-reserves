import express from "express";
import recursosRoute from './routes/recursos.js';
import usuariosRoute from './routes/usuarios.js';
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

app.use('/recursos', recursosRoute);
app.use('/usuarios', usuariosRoute);

app.listen(3000,()=>{
console.log("Server listing on port 3000")
});

app.get("/", (req, res) => {
   res.render("home");
});


