import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI)

const connection = mongoose.connection

connection.on("open",()=>{
    console.log("Conectado a la base de datps")
})

connection.on("disconnected",()=>{
    console.log("Desconectado de la base de datps")
})
connection.on("error",(error)=>{
    console.log("Error al conectarse base de datps")
})