import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

// export async function getUsers(request: Request, response: Response) {
//     return response.send("getUsers")
// }

// pegar users by role. passar por parametro.
export async function getUsersByRole(request: Request, response: Response) {
    const role = request.params.role

    if (!role) {
        return response.status(203).send("Parametro 'role' inexistente.");
    }
    
    const possibleRoles = ["admin", "student", "secretary", "professor"]
    if (!possibleRoles.includes(role)) {
      return response
          .status(203)
          .send("O role/cargo/função é invalido.");
    }

    const usersByRole = await User.find({role});

    if (!usersByRole) {
      return response
        .status(203)
        .send("Não existem usuários que se encaixam nesse role.");
    }

    return response.status(200).json(
      usersByRole);
}

export async function getUserById(request: Request, response: Response) {
    return response.send("getUserById")
}

export async function updateUserById(request: Request, response: Response) {
    return response.send("updateUserById")
}

export async function deleteUserById(request: Request, response: Response) {
    return response.send("deleteUserById")
}