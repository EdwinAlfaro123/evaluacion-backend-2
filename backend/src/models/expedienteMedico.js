import mongoose, {Schema, model} from "mongoose"

const expedienteMedicoSchema = new Schema(
    {
        patient_id: {type: mongoose.Schema.Types.ObjectId, ref: "pacientes"},
        diagnosis: {type: String},
        medications: [
            {
                medicineName: {type: String}
            }
        ],
        medicalNotes: {type: String}
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("expedienteMedico", expedienteMedicoSchema)
