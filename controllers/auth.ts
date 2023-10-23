import { Request, response, Response } from "express";
import User from "../models/user";
import Aluno from "../models/aluno"; 
import Paciente from "../models/Paciente"
import Professor from "../models/professor";
import Secretario from "../models/secretario";
import jwt from "jsonwebtoken";
import axios from "axios";



const JWT_SECRET = 'URWzLAYqnM63NDxcGnskMDnT1GanhVcAJpp6ylI5xio5otZMp2zLQ4ddYjOaT9F3'

import bcrypt from "bcrypt";
import { decode } from "punycode";
import aluno from "../models/aluno";
import { request } from "http";
import professor from "../models/professor";
import secretario from "../models/secretario";

// Funçoes User:
// Metodo POST:
export async function createUser(request: Request, response: Response) {    
  const {
    nome,
    cpf,
    role,
    matricula,
    periodoCursado,
    disciplina,
    idOrientador,
    disciplinaMinistrada,
    idSecretaria,
    senha,
  } = request.body;

  if (!nome) {
    return response
        .status(203)
        .send("Insira seu nome.");
  }

  if (!cpf) {
    return response
        .status(203)
        .send("CPF inválido.");
  }

  if (!role) {
    return response
        .status(203)
        .send("Insira sua função.");
  }

  if (!matricula) {
    return response
        .status(203)
        .send("Insira sua matrícula.");
  }

  if (!periodoCursado) {
    return response
        .status(203)
        .send("Insira o periodo sendo cursado.");
  }

  if (!disciplina) {
    return response
        .status(203)
        .send("Insira a disciplina.");
  }

  if (!idOrientador) {
    return response
        .status(203)
        .send("Insira o id do orientador.");
  }

  if (!disciplinaMinistrada) {
    return response
        .status(203)
        .send("Insira a disciplina ministrada.");
  }

  if (!idSecretaria) {
    return response
        .status(203)
        .send("Insira a id da secretária.");
  }

  if (!senha) {
    return response
        .status(203)
        .send("Senha inválida.");
  }

  if (senha.lenght < 8) {
    return response
      .status(203)
      .send("Senha inválida. Deve possuir mais de 8 caracteres.");
  }

  // Verificando se a segunda parte do nome existe:
  if (!nome.split(" ")[1]) {
    return response
        .status(203)
        .send("Insira seu nome completo.");
  }

  // Criptografia da senha:
  const senhaCriptografada = await bcrypt.hash(senha, 10);

  // Criação de um novo usuário:
  const user = await new User({
    nome,
    cpf,
    role,
    matricula,
    periodoCursado,
    disciplina,
    idOrientador,
    disciplinaMinistrada,
    idSecretaria,
    senha: senhaCriptografada,
  });

  // Se já existe um usuário no BD, o sistema para antes de tentar salvar.
  const userInDatabaseByCpf = await User.findOne({ cpf }).lean();
  if (userInDatabaseByCpf?.cpf) {
    return response
        .status(203)
        .send("Já existe um usuário no BD com esse cpf.");
  }

  // Salvamento do novo usuário no banco de dados:
  try {
    await user.save();
    return response
        .status(200)
        .send("Usuário criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
        .status(203)
        .send("Não foi possivel criar usuário.");
  }
}

// Funçoes User:
// Metodo POST:
export async function loginUser(request: Request, response: Response) {
  
  const { cpf, password } = request.body;
  if (!cpf) {
    return response
        .status(203)
        .send("CPF inválido.");
  }

  if (!password) {
    return response
        .status(203)
        .send("Senha inválida.");
  }

  if (password.lenght < 8){
      return response
        .status(203)
        .send("Senha inválida. Deve possuir mais de 8 caracteres.");
  }

  const userInDatabaseByCpf = await User.findOne({ cpf }).lean();

  // Vendo se usuário existe no DB:
  if (!userInDatabaseByCpf) {
    return response
        .status(203)
        .send("Não foi possivel encontrar um usuário com esse CPF.");
  }

  // Vendo se senha existe no DB:
  if (!userInDatabaseByCpf.senha) {
    return response
        .status(203)
        .send("erro");
  }
  
  const databaseSenhaCriptografada = userInDatabaseByCpf.senha;
  const booleanReqSenhaCriptografada = await bcrypt.compare(
    password, databaseSenhaCriptografada); // 'senha' aqui, é a que vem no request.

  // Se a comparação for 'false', retorna senha incorreta.
  if (!booleanReqSenhaCriptografada) {
    return response
        .status(203)
        .send("Senha incorreta.");
  }
  const token = jwt.sign({ email: cpf}, JWT_SECRET, {
    expiresIn: '1h',
  })
  console.log('Fez login e gerou token.')
  if (response.status(201)){
    return response.status(200).send(
      {
        auth: true,
        token: token,
        user: userInDatabaseByCpf
      }
    )
  }
  // Se comparação for 'true', retorna que pode acessar o sistema.
  return response
    .status(200)
    .send("Login feito com sucesso. Usuário pode acessar o sistema.");
}


// Funçoes Aluno:
// Metodo POST:
export async function createAluno(request: Request, response: Response) {
  const {
    matricula,
    periodo,
    nome,
    cpf,
    telefoneContato,
    professor,
    email,
    arquivado,
    
  } = request.body;

  if (!matricula) {
    return response
        .status(203)
        .send("Insira sua matrícula.");
  }
  
  if (!periodo) {
    return response
        .status(203)
        .send("Insira o periodo de aulas.");
  }

  if (!nome) {
    return response
        .status(203)
        .send("Insira seu nome.");
  }

  if (!cpf) {
    return response
        .status(203)
        .send("CPF inválido.");
  }

  if (!telefoneContato) {
    return response
        .status(203)
        .send("Insira seu numero de contato.");
  }

  if (!professor) {
    return response
        .status(203)
        .send("Insira o nome do professor.");
  }

  if (!email) {
    return response
        .status(203)
        .send("E-mail inválido.");
  }

  // Verificando se a segunda parte do nome existe:
  if (!nome.split(" ")[1]) {
    return response
        .status(203)
        .send("Insira seu nome completo.");
  }

  // Criação de um novo aluno:
  const createAluno = new Aluno({
    matricula,
    periodo,
    nome,
    cpf,
    telefoneContato,
    professor,
    email,
    arquivado,
    role: "Estudante",
  });

  // Se já existe um usuário no BD, o sistema para antes de tentar salvar.
  const AlunoInDatabaseByCpf = await Aluno.findOne({ cpf }).lean();
  if (AlunoInDatabaseByCpf?.cpf) {
    return response
        .status(203)
        .send("Já existe um aluno no BD com esse cpf.");
  }

  // Salvamento do novo usuário no banco de dados:
  try {
    await createAluno.save();
    return response
        .status(200)
        .send("Cadastro do aluno criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
        .status(203)
        .send("Não foi possivel realizar o Cadastro do aluno.");
  }
}
// Metodo GET:
export async function getAluno(req: Request, res: Response) {
  try {
    aluno.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ message: error });
      });
  } catch (error) {
    res.json({ message: error });
  }
}

// Metodo PATCH:
export async function patchAluno(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const { matricula, periodo, nome, cpf, telefoneContato, professor, email } = request.body;

    const res = await aluno.findByIdAndUpdate(id, {
      matricula,
      periodo,
      nome,
      cpf,
      telefoneContato,
      professor,
      email,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }

}

export async function PatchAlunoArquivo(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const { arquivado }
    = request.body

    const res = await aluno.findByIdAndUpdate(id, {
      arquivado,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }
}

// Metodo DELETE:
export async function deleteAluno(request: Request, response: Response) {
  try {
    const id = request.params.id;
    
    const res = await aluno.findByIdAndDelete(id)
  }
  catch (error) {
    console.error(error);
  }
}


// Funçoes Paciente:
// Metodo POST:
export async function createPaciente(request: Request, response: Response) {
  const {
    // Informações pessoais:
    nome,
    cpf,
    dataDeNacimento,
    email,
    telefoneContato,
    sexo,
    estadoCivil,
    religiao,
    rendaFamiliar,
    profissao,
    outroContato,
    nomeDoContatoResponsavel,
    menorDeIdade,
    naturalidade,
    nacionalidade,
    // Endereço:
    enderecoCep,
    enderecoLogradouro,
    enderecoBairro,
    enderecoComplemento,
    enderecoCidade,
    enderecoUF,
    // Informação de tratamento:
    dataInicioTratamento,
    dataTerminoTratamento,
    quemEncaminhou,
    tipoDeTratamento,
    alunoUnieva,
    funcionarioUnieva,
    // Arquivado:
    arquivado,

        
  } = request.body;
  
  // Informaçoes Pessoais: 
  if (!nome) {
    return response
        .status(203)
        .send("Insira seu nome.");
  }

  if (!cpf) {
    return response
        .status(203)
        .send("CPF inválido.");
  }

  if (!dataDeNacimento) {
    return response
        .status(203)
        .send("Insira a sua data de nacimento.");
  }

  if (!email) {
    return response
        .status(203)
        .send("E-mail inválido.");
  }

  if (!telefoneContato) {
    return response
        .status(203)
        .send("Insira seu numero de contato.");
  }

  if (!sexo) {
    return response
        .status(203)
        .send("Selecione o seu sexo.");
  }

  if (!estadoCivil) {
    return response
        .status(203)
        .send("selecione um estado civil.");
  }

  if (!religiao) {
    return response
        .status(203)
        .send("Insira sua religao.");
  }

  if (!rendaFamiliar) {
    return response
        .status(203)
        .send("Insira Sua Renda familiar.");
  }

  if (!profissao) {
    return response
        .status(203)
        .send("Insira a sua Profissão.");
  }

  if (!naturalidade) {
    return response
        .status(203)
        .send("Insira a sua naturalidade.");
  }

  if (!nacionalidade) {
    return response
        .status(203)
        .send("Insira a sua nacionalidade.");
  }

  // Informaçoes Pessoais: 
  if (!enderecoCep) {
    return response
        .status(203)
        .send("Insira o seu CEP.");
  }

  if (!enderecoLogradouro) {
    return response
        .status(203)
        .send("Insira o seu endereço.");
  }

  if (!enderecoBairro) {
    return response
        .status(203)
        .send("Insira o nome do seu bairro.");
  }

  if (!enderecoCidade) {
    return response
        .status(203)
        .send("Insira o nome da sua Cidade.");
  }

  if (!enderecoUF) {
    return response
        .status(203)
        .send("Insira qual a sua regiao");
  }

  // Informaçoes Pessoais:  
  if (!dataInicioTratamento) {
    return response
        .status(203)
        .send("Insira a data de incio do tratamento.");
  }
  
  if (!dataTerminoTratamento) {
    return response
        .status(203)
        .send("Insira a data do termino do tratamento.");
  }

  if (!quemEncaminhou) {
    return response
        .status(203)
        .send("Insira o nome do que encaminhou esse paciente.");
  }

  if (!tipoDeTratamento) {
    return response
        .status(203)
        .send("Insira o tipo de tratamento.");
  }

  // Criação de um novo Paciente:
  const createPaciente = new Paciente({
    // Informações pessoais:
    nome,
    cpf,
    dataDeNacimento,
    email,
    telefoneContato,
    sexo,
    estadoCivil,
    religiao,
    rendaFamiliar,
    profissao,
    outroContato,
    nomeDoContatoResponsavel,
    menorDeIdade,
    naturalidade,
    nacionalidade,
    // Endereço:
    enderecoCep,
    enderecoLogradouro,
    enderecoBairro,
    enderecoComplemento,
    enderecoCidade,
    enderecoUF,
    // Informação de tratamento:
    dataInicioTratamento,
    dataTerminoTratamento,
    quemEncaminhou,
    tipoDeTratamento,
    alunoUnieva,
    funcionarioUnieva,
  });

  // Se já existe um usuário no BD, o sistema para antes de tentar salvar.
  const PacienteInDatabaseByCpf = await Paciente.findOne({ cpf }).lean();
  if (PacienteInDatabaseByCpf?.cpf) {
    return response
        .status(203)
        .send("Já existe um Paciente no BD com esse cpf.");
  }

  // Salvamento do novo usuário no banco de dados:
  try {
    await createPaciente.save();
    return response
        .status(200)
        .send("Cadastro de pacinete criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
        .status(203)
        .send("Não foi possivel criar Cadastro de pacinete.");
  }
}

// Metodo GET:
export async function getPaciente(req: Request, res: Response) {
  try {
    Paciente.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ message: error });
      });
  } catch (error) {
    res.json({ message: error });
  }
}

// Metodo PATCH:
export async function patchPaciente(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const {
    // Informações pessoais:
    nome,
    cpf,
    dataDeNacimento,
    email,
    telefoneContato,
    sexo,
    estadoCivil,
    religiao,
    rendaFamiliar,
    profissao,
    outroContato,
    nomeDoContatoResponsavel,
    menorDeIdade,
    naturalidade,
    nacionalidade,
    // Endereço:
    enderecoCep,
    enderecoLogradouro,
    enderecoBairro,
    enderecoComplemento,
    enderecoCidade,
    enderecoUF,
    // Informação de tratamento:
    dataInicioTratamento,
    dataTerminoTratamento,
    quemEncaminhou,
    tipoDeTratamento,
    alunoUnieva,
    funcionarioUnieva,
    } = request.body;

    const res = await Paciente.findByIdAndUpdate(id, {
    // Informações pessoais:
    nome,
    cpf,
    dataDeNacimento,
    email,
    telefoneContato,
    sexo,
    estadoCivil,
    religiao,
    rendaFamiliar,
    profissao,
    outroContato,
    nomeDoContatoResponsavel,
    menorDeIdade,
    naturalidade,
    nacionalidade,
    // Endereço:
    enderecoCep,
    enderecoLogradouro,
    enderecoBairro,
    enderecoComplemento,
    enderecoCidade,
    enderecoUF,
    // Informação de tratamento:
    dataInicioTratamento,
    dataTerminoTratamento,
    quemEncaminhou,
    tipoDeTratamento,
    alunoUnieva,
    funcionarioUnieva,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }

}

export async function patchPacienteArquivo(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const { arquivado }
    = request.body

    const res = await Paciente.findByIdAndUpdate(id, {
      arquivado,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }
}

// Metodo DELETE:
export async function deletePaciente(request: Request, response: Response) {
  try {
    const id = request.params.id;
    
    const res = await Paciente.findByIdAndDelete(id)
  }
  catch (error) {
    console.error(error);
  }
}

// Funçoes Professor:
// Metodo POST:
export async function createProfessor(request: Request, response: Response) {
  const {
    nome,
    cpf,
    telefoneContato,
    email,
    disciplina,
    arquivado,

  } = request.body;

  if (!nome) {
    return response
        .status(203)
        .send("Insira seu nome.");
  }

  if (!cpf) {
    return response
        .status(203)
        .send("CPF inválido.");
  }

  if (!telefoneContato) {
    return response
        .status(203)
        .send("Insira seu numero de contato.");
  }
  
    if (!email) {
      return response
          .status(203)
          .send("E-mail inválido.");
    }

  if (!disciplina) {
    return response
        .status(203)
        .send("Insira o nome da disciplina.");
  }

  // Verificando se a segunda parte do nome existe:
  if (!nome.split(" ")[1]) {
    return response
        .status(203)
        .send("Insira seu nome completo.");
  }

  // Criação de um novo Professor:
  const createProfessor = new Professor({
    nome,
    cpf,
    telefoneContato,
    email,
    disciplina,
  });

  // Se já existe um usuário no BD, o sistema para antes de tentar salvar.
  const ProfessorInDatabaseByCpf = await Professor.findOne({ cpf }).lean();
  if (ProfessorInDatabaseByCpf?.cpf) {
    return response
        .status(203)
        .send("Já existe um usuário no BD com esse cpf.");
  }

  // Salvamento do novo usuário no banco de dados:
  try {
    await createProfessor.save();
    return response
        .status(200)
        .send("Cadastro de professor criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
        .status(203)
        .send("Não foi possivel criar Cadastro de professor.");
  }
}

// Metodo GET:
export async function getProfessores(req: Request, res: Response) {
  try {
    professor.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ message: error });
      });
  } catch (error) {
    res.json({ message: error });
  }
}

// Metodo PATCH:
export async function patchProfessor(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const {
    nome,
    cpf,
    telefoneContato,
    email,
    disciplina,
    } = request.body;

    const res = await professor.findByIdAndUpdate(id, {
    nome,
    cpf,
    telefoneContato,
    email,
    disciplina,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }

}

export async function patchProfessorArquivo(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const { arquivado }
    = request.body

    const res = await professor.findByIdAndUpdate(id, {
      arquivado,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }
}

// Metodo DELETE:
export async function deleteProfessor(request: Request, response: Response) {
  try {
    const id = request.params.id;
    
    const res = await professor.findByIdAndDelete(id)
  }
  catch (error) {
    console.error(error);
  }
}

// Funçoes Secretario:
// Metodo POST:
export async function createSecretario(request: Request, response: Response) {
  const {
    nome,
    cpf,
    telefoneContato,
    email,
    turno,
    arquivado,

  } = request.body;

  if (!nome) {
    return response
        .status(203)
        .send("Insira seu nome.");
  }

  if (!cpf) {
    return response
        .status(203)
        .send("CPF inválido.");
  }

  if (!telefoneContato) {
    return response
        .status(203)
        .send("Insira seu numero de contato.");
  }
  
    if (!email) {
      return response
          .status(203)
          .send("E-mail inválido.");
    }

  if (!turno) {
    return response
        .status(203)
        .send("Selecione  seu turno.");
  }

  // Verificando se a segunda parte do nome existe:
  if (!nome.split(" ")[1]) {
    return response
        .status(203)
        .send("Insira seu nome completo.");
  }

  // Criação de um novo Secretario:
  const createSecretario = new Secretario({
    nome,
    cpf,
    telefoneContato,
    email,
    turno,
  });

  // Se já existe um usuário no BD, o sistema para antes de tentar salvar.
  const SecretarioInDatabaseByCpf = await Secretario.findOne({ cpf }).lean();
  if (SecretarioInDatabaseByCpf?.cpf) {
    return response
        .status(203)
        .send("Já existe um usuário no BD com esse cpf.");
  }

  // Salvamento do novo usuário no banco de dados:
  try {
    await createSecretario.save();
    return response
        .status(200)
        .send("Cadastro de secretario criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
        .status(203)
        .send("Não foi possivel criar Cadastro de secretario.");
  }
}

// Metodo GET:
export async function getSecretarios(req: Request, res: Response) {
  try {
    secretario.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ message: error });
      });
  } catch (error) {
    res.json({ message: error });
  }
}

export async function getSecretarioById(req: Request, res: Response) {
  try {
    if (!secretario) {
      throw new Error('secretario object is undefined');
    }

    const secretarioData = await secretario.findById(req.params.id);

    if (!secretarioData) {
      throw new Error('secretario not found');
    }

    res.json(secretarioData);
  } catch (error: any) {
    res.json({ message: error.message });
  }
}

// Metodo PATCH:
export async function patchSecretario(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const {
    nome,
    cpf,
    telefoneContato,
    email,
    turno,
    } = request.body;

    const res = await secretario.findByIdAndUpdate(id, {
    nome,
    cpf,
    telefoneContato,
    email,
    turno,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }

}

export async function patchSecretarioArquivo(request: Request, response: Response) {
  try {
    const id = request.params.id;
    const { arquivado }
    = request.body

    const res = await secretario.findByIdAndUpdate(id, {
      arquivado,
    });
    response.send({ status: "ok", ocorrencias: res})
  }
  catch (error) {
    console.error(error);
  }
}

// Metodo DELETE:
export async function deleteSecretario(request: Request, response: Response) {
  try {
    const id = request.params.id;
    
    const res = await secretario.findByIdAndDelete(id)
  }
  catch (error) {
    console.error(error);
  }
}