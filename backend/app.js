import express from "express"
import cookieParser from "cookie-parser"

import especialidadRoutes from "./src/routes/especialidadMedica.js"

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use("/api/especialidadMedica", especialidadRoutes)

export default app