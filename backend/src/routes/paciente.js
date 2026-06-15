import express from "express"
import pacienteController from "../controller/pacienteController.js"
import uploader from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(pacienteController.get)

router.route("/:id")
.put(uploader.single("profilePhoto"), pacienteController.put)
.delete(pacienteController.delete)

export default router