import mongoose, {Schema, model} from "mongoose"

const citasMedicasSchema = new Schema(
    {
        patient_id: {type: mongoose.Schema.Types.ObjectId, ref: "pacientes"},
        specialty_id: {type: mongoose.Schema.Types.ObjectId, ref: "especialidadMedica"},
        appointmentDate: {type: Date},
        reason: {type: String},
        status: {type: String},
        observations: {type: String}
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("citasMedicas", citasMedicasSchema)