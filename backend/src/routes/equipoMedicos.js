import express from "express"
import equipoMedicosController from "../controller/equiposMedicos.js"
import uploader from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(equipoMedicosController.get)
.post(uploader.single("image"), equipoMedicosController.post)

router.route("/:id")
.put(uploader.single("image"), equipoMedicosController.put)
.delete(equipoMedicosController.delete)

export default router