import express from "express"
import cookieParser from "cookie-parser"

import especialidadRoutes from "./src/routes/especialidadMedica.js"
import equipoRoutes from "./src/routes/equipoMedicos.js"
import pacienteRoutes from "./src/routes/paciente.js"
import citaMedicaRoutes from "./src/routes/citasMedicas.js"

import registerRoute from "./src/routes/registerPaciente.js"
import loginRoutes from "./src/routes/loginPaciente.js"
import logoutRoutes from "./src/routes/logout.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js"

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use("/api/especialidadMedica", especialidadRoutes)
app.use("/api/equipo", equipoRoutes)
app.use("/api/register", registerRoute)
app.use("/api/paciente", pacienteRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/recovery", recoveryPasswordRoutes)
app.use("/api/citas", citaMedicaRoutes)

export default app