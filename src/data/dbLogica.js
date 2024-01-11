const fs = require("fs")
const path=require("path")


const leerArchivo=(parametro)=>{
let filePath=path.join(__dirname,"../data",parametro+".json")
let baseDeDatos=JSON.parse(filePath,"utf-8")

return baseDeDatos
}

module.exports={leerArchivo}