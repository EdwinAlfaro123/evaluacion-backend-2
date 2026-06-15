import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import "./database.js"

async function main(){
    app.listen(process.env.PORT || 4000, () => {
        console.log("Servidor corriendo en el puerto 4000")
    })
}

main()