import { Request, Response } from "express";
import User from "../models/user";
import Aluno from "../models/aluno";
import Professor from "../models/professor";
import Secretario from "../models/secretario";

import bcrypt from "bcrypt";

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

export async function createAluno(request: Request, response: Response) {
  const {
    matricula,
    periodo,
    nome,
    cpf,
    telefoneContato,
    professor,
    email,
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
  });

  // Se já existe um usuário no BD, o sistema para antes de tentar salvar.
  const AlunoInDatabaseByCpf = await Aluno.findOne({ cpf }).lean();
  if (AlunoInDatabaseByCpf?.cpf) {
    return response
        .status(203)
        .send("Já existe um usuário no BD com esse cpf.");
  }

  // Salvamento do novo usuário no banco de dados:
  try {
    await createAluno.save();
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

export async function createProfessor(request: Request, response: Response) {
  const {
    nome,
    cpf,
    telefoneContato,
    email,
    disciplina,
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
        .send("Usuário criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
        .status(203)
        .send("Não foi possivel criar usuário.");
  }
}

export async function createSecretario(request: Request, response: Response) {
  const {
    nome,
    cpf,
    telefoneContato,
    email,
    turno,
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
        .send("Insira seu turno.");
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
        .send("Usuário criado com sucesso.");
  } catch (e) {
    console.error(e);
    return response
        .status(203)
        .send("Não foi possivel criar usuário.");
  }
}

export async function loginUser(request: Request, response: Response) {
  const { cpf, senha } = request.body;

  if (!cpf) {
    return response
        .status(203)
        .send("CPF inválido.");
  }

  if (!senha) {
    return response
        .status(203)
        .send("Senha inválida.");
  }

  if (senha.lenght < 8){
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
    senha, databaseSenhaCriptografada); // 'senha' aqui, é a que vem no request.

  // Se a comparação for 'false', retorna senha incorreta.
  if (!booleanReqSenhaCriptografada) {
    return response
        .status(203)
        .send("Senha incorreta.");
  }

  // Se comparação for 'true', retorna que pode acessar o sistema.
  return response
    .status(200)
    .send("Login feito com sucesso. Usuário pode acessar o sistema.");
}
