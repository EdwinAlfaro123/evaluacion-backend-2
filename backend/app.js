import express from "express"
import cookieParser from "cookie-parser"

import especialidadRoutes from "./src/routes/especialidadMedica.js"
import equipoRoutes from "./src/routes/equipoMedicos.js"

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use("/api/especialidadMedica", especialidadRoutes)
app.use("/api/equipo", equipoRoutes)

export default app