import equipoMedicoModel from "../models/equiposMedicos.js"
import {v2 as cloduinary} from "cloudinary"

const equipoMedicoController = {}

equipoMedicoController.get = async (req, res) => {
    try {
        const equipos = await equipoMedicoModel.find()
        return res.status(200).json(equipos)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

equipoMedicoController.post = async (req, res) => {
    try {
        const {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable} = req.body
        const newEquipo = new equipoMedicoModel({
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            image: req.file.path,
            piblic_id: req.file.filename,
            status,
            isAvailable
        })
        await newEquipo.save()
        return res.status(200).json({message: "equipo creada"}) 
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

equipoMedicoController.put = async (req, res) => {
    try {
        const {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable
        } = req.body
        const Found = await equipoMedicoModel.findById(req.params.id)
        const updatedData = {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable
        }
        if(req.file){
            await cloduinary.uploader.destroy(Found.public_id)
            updatedData.image = req.file.path
            updatedData.public_id = req.file.filename
        }
        await equipoMedicoModel.findByIdAndUpdate(req.params.id, updatedData, {new: true})

        return res.status(200).json({message: "Actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

equipoMedicoController.delete = async (req, res) => {
    try {
        const Found = await equipoMedicoModel.findById(req.params.id)
        await cloduinary.uploader.destroy(Found.public_id)
        const deleted = await equipoMedicoModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default equipoMedicoController