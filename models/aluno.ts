import mongoose from "mongoose";

const alunoSchema = new mongoose.Schema (
    {
        createdAt: {
            type: Date,
            default: Date.now(),    
          },
          matricula: {
            type: String,
            required: true,
          },
          periodo: {
            type: String,
            require: true,  
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
            type: String,
            required: true,
          },
          professor: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
    },
    { timestamps: true }
);

export default mongoose.model("Aluno", alunoSchema);