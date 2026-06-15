import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"
import pacienteModel from "../models/pacientes.js"
import {maxHeaderSize} from "http"
import {error} from "console"
import bcryptjs from "bcryptjs"

const registerPacientesController = {}

registerPacientesController.register = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified,
            timeOut
        } = req.body

        const existe = await pacienteModel.findOne({email})
        if(existe){
            return res.status(400).json({message: "existe"})
        }
        const passwordHashed = await bcryptjs.hash(password, 10)
        const randomCode = crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign({
            randomCode,
            name,
            lastName,
            email,
            password: passwordHashed,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified,
            timeOut}, config.JWT.secret, {expiresIn: "15m"})
            res.cookie("registerCookie", token, {maxAge: 15 * 60 * 1000})
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: config.email.user_email,
                    pass: config.email.user_password
                }
            })

            const mailOptions = {
                from: config.email.user_email,
                to: email,
                subject: "Verificacion",
                text: "Utiliza este codigo: " + randomCode + " Expira en 15 minutos"
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log("error" + error)
                    return res.status(500).json({message: "Error sending"})
                }
                return res.status(200).json({message: "sent"})
            })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

registerPacientesController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body
        const token = req.cookies.registrationCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {randomCode: storedCode,
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified,
            loginAttempts,
            timeOut
        } = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalido"})
        }

        const newPaciente = pacienteModel({
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified: true,
        })
        await newPaciente.save()
        res.clearCookie("registrationCookie")
        return res.status(200).json({message: "registrado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default registerPacientesController