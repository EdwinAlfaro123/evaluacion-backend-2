import express, {Router} from "express"
import expedienteMedicoController from "../controller/expedienteMedicoController.js"

const router = express.Router()

router.route("/")
.get(expedienteMedicoController.get)
.post(expedienteMedicoController.post)

router.route("/:id")
.put(expedienteMedicoController.put)
.delete(expedienteMedicoController.delete)

export default router