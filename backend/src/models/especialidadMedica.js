import {Schema, model} from "mongoose"

const especialidadMedicaSchema = new Schema(
    {
        specialtyName: {type: String},
        description: {type: String},
        isAvailable: {type: Boolean}
    },
    {
        timeseries: true,
        strict: false
    }
)

export default model("especialidadMedica", especialidadMedicaSchema)