import mongoose from "mongoose";

const alunoSchema = new mongoose.Schema (
    {
        createdAt: {
            type: Date,
            default: Date.now(),    
          },
          matricula: {
            type: Number,
            required: true,
          },
          periodo: {
            type: Number,
            require: true,  
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
          professsor: {
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