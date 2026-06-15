import express from "express"
import registerPacientesController from "../controller/registerPacientesController.js"

const router = express.Router()

router.route("/")
.post(registerPacientesController.register)

router.route("/verify")
.post(registerPacientesController.verifyCode)

export default router