import express from "express";
const router = express.Router();
import { 
    createUser,

    loginUser,

    createAluno,
    getAluno,
    getAlunoById,
    patchAluno,
    PatchAlunoArquivo,
    deleteAluno,

    createPaciente,
    getPaciente,
    getPacienteById,
    patchPaciente,
    patchPacienteArquivo,
    deletePaciente,

    createProfessor,
    getProfessores,
    getProfessorById,
    patchProfessor,
    patchProfessorArquivo,
    deleteProfessor,
    
    createSecretario,
    getSecretarioById,
    getSecretarios,
    patchSecretario,
    patchSecretarioArquivo,
    deleteSecretario,
} from "../controllers/auth"    ;
import professor from "../models/professor";
import secretario from "../models/secretario";
import aluno from "../models/aluno";
import paciente from "../models/Paciente";
import { runInContext } from "vm";

/**
 * @swagger
 * /auth/register:
 *   post:
 *      description: Cria um usuário
 *      parameters:
 *      - name: nome
 *        description: Nome do usuário
 *        in: formData
 *        type: string
 *        example: Fulano de Ciclano
 *      - name: cpf
 *        description: CPF do usuário
 *        in: formData
 *        type: integer
 *        example: 12345678912
 *      - name: role
 *        description: Função que o usuário exerce
 *        in: formData
 *        type: string
 *        example: Estudante
 *      - name: matricula
 *        description: Número de matrícula do usuário
 *        in: formData
 *        type: integer
 *        example: 1234567
 *      - name: periodoCursado
 *        description: Período cursado pelo usuário
 *        in: formData
 *        type: integer
 *        example: 4
 *      - name: disciplina
 *        description: Disciplina cursada pelo usuário
 *        in: formData
 *        type: string
 *        example: Cidadania, ética e espiritualidade
 *      - name: idOrientador
 *        description: Identificação do orientador
 *        in: formData
 *        type: integer
 *        example: 1234567
 *      - name: disciplinaMinistrada
 *        description: Disciplina ministrada pelo orientador
 *        in: formData
 *        type: string
 *        example: Cidadania, ética e espiritualidade
 *      - name: idSecretaria
 *        description: Identificação da secretária
 *        in: formData
 *        type: integer
 *        example: 1234567
 *      - name: senha
 *        description: Senha do usuário
 *        in: formData
 *        type: string
 *      responses:
 *        200:
 *          description: Usuário criado com sucesso.
 *        203:
 *          description: Não foi possível criar usuário.
 *        
 * 
 */
// Rota User:
router.post("/register", createUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *    description: Método de login do usuário
 *    parameters:
 *    - name: cpf
 *      description: CPF do usuário
 *      in: formData
 *      type: integer
 *    - name: senha
 *      description: Senha do usuário
 *      in: formData
 *      type: string
 *    responses:
 *      200:
 *        description: Login realizado com sucesso
 *      203:
 *        description: Erro
 * 
 */

// Rota Login:
router.post("/login", loginUser);

// Rotas Aluno 
router.post("/registroAluno", createAluno);
router.get("/getAlunos", getAluno);
router.get("/getAlunoById/:id", getAlunoById)
router.patch("/attAluno/:id", patchAluno);
router.patch("/arquivarAluno/:id", PatchAlunoArquivo);
router.delete("/deleteAluno/:id", deleteAluno);

// Rotas Paciente
router.post("/registroPaciente", createPaciente);
router.get("/getPacientes", getPaciente);
router.get("/getPacienteById/:id", getPacienteById)
router.patch("/attPaciente", patchPaciente);
router.patch("/arquivarPacientes", patchPacienteArquivo);
router.delete("/arquivarPacientes", deletePaciente);

// Rotas Professor 
router.post("/registroProfessor", createProfessor);
router.get("/getProfessores", getProfessores);
router.get("/getProfessorById/:id", getProfessorById)
router.patch("/attProfessor", patchProfessor);
router.patch("/arquivarProfessor", patchProfessorArquivo);
router.delete("/arquivarProfessor", deleteProfessor);

// Rotas Secretario
router.post("/registroSecretario", createSecretario);
router.get("/getSecretarios", getSecretarios);
router.get("/getSecretarioById/:id", getSecretarioById);
router.patch("/attSecretario", patchSecretario);
router.patch("/arquivarSecretario", patchSecretarioArquivo);
router.delete("/arquivarSecretario", deleteSecretario);

// obs. da errqo se tentar utilizar export default
module.exports = router
