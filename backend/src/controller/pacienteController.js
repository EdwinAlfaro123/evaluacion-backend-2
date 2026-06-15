import pacienteModel from "../models/pacientes.js"
import {v2 as cloduinary} from "cloudinary"


const pacienteController = {}

pacienteController.get = async (req, res) => {
    try {
        const pacientes = await pacienteModel.find()
        return res.status(200).json(pacientes)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

pacienteController.put = async (req, res) => {
    try {
        let{
            name,
            lastName,
            email,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified
        } = req.body
        const Found = await pacienteModel.findById(req.params.id)    
        const updatedData = {
            name,
            lastName,
            email,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified
        }
        if(req.file){
            await cloduinary.uploader.destroy(Found.public_id)
            updatedData.profilePhoto = req.file.path
            updatedData.public_id = req.file.filename
        }
        await pacienteModel.findByIdAndUpdate(req.params.id, updatedData, {new: true})
        return res.status(200).json({message: "Actualizado"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

pacienteController.delete = async (req, res) => {
    try {
        const Found = await pacienteModel.findById(req.params.id)
            console.log(Found.public_id)

        await cloduinary.uploader.destroy(Found.public_id)
        await pacienteModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Eliminado"})
        } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default pacienteController