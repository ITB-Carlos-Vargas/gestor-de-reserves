import fs from "fs";
import express from "express";


const router = express.Router();

const readRecursos = () => {
    try {
        const data = fs.readFileSync("./jasons/recurso.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
 };
 
 
 const writeRecursos = (data) => {
    try {
        fs.writeFileSync("./jasons/recurso.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
 };

 router.get("/",(req,res)=>{
    const user={name:"Carlos"}
    const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p> <a href="http://localhost:3000/">Visita Example</a>`;
    const data = readRecursos();
    res.render("recurso",{user, data, htmlMessage})
 });

 router.get("/:id_recurso",(req,res)=>{
    const data=readRecursos();
   
    const id_recurso=parseInt(req.params.id_recurso);
    const recurso=data.recurso.find((recurso)=>recurso.id_recurso===id_recurso);
    res.render("recursoDetails",{ recurso})
 });
 
 router.get("/editar/:id_recurso", (req, res) => {
   const data = readRecursos();
   const id_recurso = parseInt(req.params.id_recurso);
   const recurso = data.recurso.find((recurso) => recurso.id_recurso === id_recurso);

  

   res.render("recursoEdit", { recurso});
});

 
 router.post("/",(req,res)=>{
    const data=readRecursos();
    const body=req.body;
 
    const newrecurso={
    id_recurso:data.recurso.length+1,
    ...body, 
    };
    data.recurso.push(newrecurso);
    writeRecursos(data);
    res.json(newrecurso);
 });
 
 router.put("/:id_recurso", (req, res) => {
    const data = readRecursos();
    const body = req.body;
    const id_recurso = parseInt(req.params.id_recurso);
    const recursoIndex = data.recurso.findIndex((recurso) => recurso.id_recurso === id_recurso);
    data.recurso[recursoIndex] = {
    ...data.recurso[recursoIndex],
    ...body,
    };
    writeRecursos(data);
    res.json({ message: "recurso updated successfully" });
    });
 
 

 router.delete("/:id_recurso", (req, res) => {
    const data = readRecursos();
    const id_recurso = parseInt(req.params.id_recurso);
 
    const newData = data.recurso.filter(recurso => recurso.id_recurso !== id_recurso);
  
    writeRecursos({ recurso: newData });
    res.json({ message: "Notificación eliminada correctamente" });
 });
 

 export default router;