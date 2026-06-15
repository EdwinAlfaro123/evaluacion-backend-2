import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import HTMLRecoveryEmail from "../utils/sendMailRecovery.js"
import {config} from "../../config.js"
import pacienteModel from "../models/pacientes.js"
import {reverse} from "dns"
import { maxHeaderSize } from "http"

const recoveryPasswordController = {}

recoveryPasswordController.requestCode = async (req, res) => {
    try {
        const {email} = req.body
        const pacienteFound = await pacienteModel.findOne({email})
        if(!pacienteFound){
            return res.status(404).json({message: "Not Found"})
        }
        const randomCode = crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign(
            {email, randomCode, userType: "paciente", Verified: "false"},
            config.JWT.secret, {expiresIn: "15m"}
        )
        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000})
        const transporter = nodemailer .createTransport({
            service: "gmail",
            auth: {user: config.email.user_email, pass: config.email.user_password}
        })
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Recuperacion",
            body: "Vence en 15 minutos",
            html: HTMLRecoveryEmail(randomCode)
        }
        
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error al mandar"})
            }
            return res.status(200).json({message: "Enviado"})
        })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

recoveryPasswordController.verifyCode = async (req, res) => {
    try {
        const {code} = req.body
        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Invalido"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, userType: "paciente", Verified: true},
            config.JWT.secret, {expiresIn: "15m"}
        )
        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000})
        return res.status(200).json({message: "Verificado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

recoveryPasswordController.newPassword = async (req, res) => {
    try {
        const {newPassword, confirmNewPassword} = req.body
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "No coincide"})
        }
        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        if(!decoded.Verified){
            return res.status(400).json({message: "no verificado"})
        }
        const passwordHash = await bcryptjs.hash(newPassword, 10)
        await pacienteModel.findOneAndUpdate(
            {email: decoded.email},
            {password: decoded.passwordHash},
            {new: true}
        )
        res.clearCookie("recoveryCookie")
        return res.status(200).json({message: "Contraseña Actualizada"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default recoveryPasswordController