import especialidadMedicaModel from "../models/especialidadMedica.js"

const especialidadMedicaController = {}

especialidadMedicaController.get = async (req, res) => {
    try {
        const especialidades = await especialidadMedicaModel.find()
        return res.status(200).json(especialidades)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

especialidadMedicaController.post = async (req, res) => {
    try {
        const {specialtyName, description, isAvailable} = req.body
        const newEspecialidad = new especialidadMedicaModel({specialtyName, description, isAvailable})
        await newEspecialidad.save()
        return res.status(200).json({message: "Especialidad creada"}) 
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

especialidadMedicaController.put = async (req, res) => {
    try {
        const {specialtyName, description, isAvailable} = req.body
        const updatedEspecialidad = await especialidadMedicaModel.findByIdAndUpdate(req.params.id, {
                specialtyName,
                description,
                isAvailable
            }
        )

        if(!updatedEspecialidad){
            return res.status(400).json({message: "No encontrado"})
        }

        return res.status(200).json({message: "Actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

especialidadMedicaController.delete = async (req, res) => {
    try {
        const deleteEspecialidad = await especialidadMedicaModel.findByIdAndDelete(req.params.id)
        if(!deleteEspecialidad){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default especialidadMedicaController