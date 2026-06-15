import express from "express"
import registerPacientesController from "../controller/registerPacientesController.js"
import uploader from "../utils/cloudinaryConfig.js" 

const router = express.Router()

router.route("/")
.post(uploader.single("profilePhoto"), registerPacientesController.register)

router.route("/verify")
.post(registerPacientesController.verifyCode)

export default router