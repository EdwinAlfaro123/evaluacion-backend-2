import expedienteMedicoModel from "../models/expedienteMedico.js"

const expedienteMedicoController = {}

expedienteMedicoController.get = async (req, res) => {
    try {
        const expedienteMedico = await expedienteMedicoModel.find()
        return res.status(200).json(expedienteMedico)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

expedienteMedicoController.post = async (req, res) => {
    try {
        const {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        } = req.body
        const newExpediente = new expedienteMedicoModel({
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        })
        await newExpediente.save()
        return res.status(200).json({message: "Expediente creado"}) 
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

expedienteMedicoController.put = async (req, res) => {
    try {
        const {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        } = req.body
        const updatedExpediente = await expedienteMedicoModel.findByIdAndUpdate(req.params.id, {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
            }, {new: true}
        )

        if(!updatedExpediente){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

expedienteMedicoController.delete = async (req, res) => {
    try {
        const deleteExpediente = await expedienteMedicoModel.findByIdAndDelete(req.params.id)
        if(!deleteExpediente){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default expedienteMedicoController