import citasMedicasModel from "../models/citasMedicas.js"

const citasMedicasController = {}

citasMedicasController.get = async (req, res) => {
    try {
        const citasMedicas = await citasMedicasModel.find()
        return res.status(200).json(citasMedicas)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

citasMedicasController.post = async (req, res) => {
    try {
        const {
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations} = req.body
        const newCita = new citasMedicasModel({
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        })
        await newCita.save()
        return res.status(200).json({message: "Cita creada"}) 
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

citasMedicasController.put = async (req, res) => {
    try {
        const {
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        } = req.body
        const updatedCita = await citasMedicasModel.findByIdAndUpdate(req.params.id, {
                patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
            }, {new: true}
        )

        if(!updatedCita){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

citasMedicasController.delete = async (req, res) => {
    try {
        const deleteCita = await citasMedicasModel.findByIdAndDelete(req.params.id)
        if(!deleteCita){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default citasMedicasController