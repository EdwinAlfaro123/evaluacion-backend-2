import express, {Router} from "express"
import especialidadMedicaController from "../controller/especialidadMedicaController.js"

const router = express.Router()

router.route("/")
.get(especialidadMedicaController.get)
.post(especialidadMedicaController.post)

router.route("/:id")
.put(especialidadMedicaController.put)
.delete(especialidadMedicaController.delete)

export default router