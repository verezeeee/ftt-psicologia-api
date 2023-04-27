import { Request, Response } from "express";
import Paciente from "../models/Paciente";

export async function createPaciente(request: Request, response: Response) {
  const {
    nome,
    cpf,
    idade,
    enderecoCep,
    enderecoNumero,
    religiao,
    profissao,
    estadoCivil,
    sexo,
    naturalidade,
    nacionalidade,
    rendaFamiliar,
    nomeContato,
    telefoneContato,
    instituicaoDeEstudo,
    nomeResponsavelLegal,
    contatoResponsavelLegal,
    dataInicioTratamento,
    dataTerminoTratamento,
    nomePessoaEncaminhamento,
    funcionarioUnievangelica,
    alunoUnievangelica,
    tratamentoOferecido,
  } = request.body;

  if (!nome) {
    return response
      .status(203)
      .send("Insira seu nome.");
  }

  if (!cpf) {
    return response
      .status(203)
      .send("Insira seu CPF");
  }

  if (!funcionarioUnievangelica) {
    return response
      .status(203)
      .send("Insira se é um funcionário da instituição.");
  }

  // Se já existe um paciente no BD, o sistema para antes de tentar salvar.
  const pacienteInDatabaseByCpf = await Paciente.findOne({ cpf }).lean();

  if (pacienteInDatabaseByCpf?.cpf) {
    return response
      .status(203)
      .send("Já existe um usuário no BD com esse cpf.");
  }

  const paciente = await new Paciente({
    nome,
    cpf,
    idade,
    enderecoCep,
    enderecoNumero,
    religiao,
    profissao,
    estadoCivil,
    sexo,
    naturalidade,
    nacionalidade,
    rendaFamiliar,
    nomeContato,
    telefoneContato,
    instituicaoDeEstudo,
    nomeResponsavelLegal,
    contatoResponsavelLegal,
    dataInicioTratamento,
    dataTerminoTratamento,
    nomePessoaEncaminhamento,
    funcionarioUnievangelica,
    alunoUnievangelica,
    tratamentoOferecido,
  });

  // Salvamento do novo paciente no banco de dados:
  try {
    await paciente.save();
    return response
      .status(200)
      .send("Paciente criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel criar paciente.");
  }
}

export async function getPacientes(request: Request, response: Response) {
  const pacienteById = await Paciente.find({});
  
  // Se não encontrar pacientes.
  if (!pacienteById) {
    return response
      .status(203)
      .send("Não existem pacientes no BD.");
  }

  return response
    .status(200)
    .json(pacienteById);
}

export async function getPacienteById(request: Request, response: Response) {
  const _id = request.params.id;

  const pacienteById = await Paciente.findOne({ _id:_id }).lean();
  
  // Se não encontrar paciente com esse id.
  if (!pacienteById) {
    return response
      .status(203)
      .send("Não existe paciente com esse ID no BD.");
  }

  return response
    .status(200)
    .json(pacienteById);
}

export async function updatePacienteById(request: Request, response: Response) {
  const _id = request.params.id;

  const pacienteById = await Paciente.findByIdAndUpdate(_id, request.body);

  // Se não encontrar paciente com esse id.
  if (!pacienteById) {
    return response
      .status(203)
      .send("Não existe paciente com esse ID no BD.");
  }

  // Salvando a operação no BD.
  try {
    await pacienteById.save();
    return response
      .status(200)
      .send("Paciente modificado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel modificar o paciente.");
  }
}

export async function deletePacienteById(request: Request, response: Response) {
  const _id = request.params.id;

  const pacienteById = await Paciente.findByIdAndDelete(_id, request.body);

  // Se não encontrar paciente com esse id.
  if (!pacienteById) {
    return response
      .status(203)
      .send("Não existe paciente com esse ID no BD.");
  }

  // Salvando a operação no BD.
  try {
    await pacienteById.save();
    return response
      .status(200)
      .send("Paciente modificado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
      .status(203)
      .send("Não foi possivel modificar o paciente.");
  }
}
