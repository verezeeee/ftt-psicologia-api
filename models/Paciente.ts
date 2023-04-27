import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema(
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
        trim: true
      },
      idade: {
        type: Number
      },
      enderecoCep: {
        type: Number
      },
      enderecoComplemento: {
        type: String
      },
      enderecoNumero: {
        type: Number
      },
      religiao: {
        type: String
      },
      profissao: {
        type: String
      },
      estadoCivil: {
        type: String
      },
      sexo: {
        type: String
      },
      naturalidade: {
        type: String
      },
      nacionalidade: {
        type: String
      },
      rendaFamiliar: {
        type: String
      },
      nomeContato: {
        type: String
      },
      telefoneContato: {
        type: Number
      },
      instituicaoDeEstudo: {
        type: String
      },
      nomeResponsavelLegal: {
        type: String
      },
      contatoResponsavelLegal: {
        type: Number
      },
      dataInicioTratamento: {
        type: Date
      },
      dataTerminoTratamento: {
        type: Date
      },
      nomePessoaEcaminhamento: {
        type: String
      },
      funcionarioUnievangelica: {
        type: Boolean,
        required: true,
        default: false
      },
      alunoUnievangelica: {
        type: Boolean
      },
      tratamentoOferecido: {
        type: String
      },
    },
    { timestamps: true }
  );

export default mongoose.model("Paciente", pacienteSchema);
