import mongoose from "mongoose";

const professorSchema = new mongoose.Schema (
    {
        createdAt: {
            type: Date,
            default: Date.now(),
          },
          nome: {
            type: String,
            required: true,
            trim: true,
          },
          cpf: {
            type: Number,
            required: true,
          },
          telefoneContato: {
            type: Number,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          turno: {
            type: String,
            required: true,
          },
    },
    { timestamps: true }
);

export default mongoose.model("Secretario", professorSchema);