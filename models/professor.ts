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
            type: String,
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
          disciplina: {
            type: String,
            required: true,
            trim: true,
          },
    },
    { timestamps: true }
);

export default mongoose.model("Professor", professorSchema);