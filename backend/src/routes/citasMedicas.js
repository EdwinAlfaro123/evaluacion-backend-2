import express, {Router} from "express"
import citasMedicasController from "../controller/citasMedicasController.js"

const router = express.Router()

router.route("/")
.get(citasMedicasController.get)
.post(citasMedicasController.post)

router.route("/:id")
.put(citasMedicasController.put)
.delete(citasMedicasController.delete)

export default router