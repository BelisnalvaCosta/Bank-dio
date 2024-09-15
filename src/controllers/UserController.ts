import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (request: Request, response: Response): Response => {
    const { name, email } = request.body;

    if (!name) {
      return response.status(400).json({ message: 'Bad request! Name obrigatório' });
    }

    if (!email || !this.isValidEmail(email)) {
      return response.status(400).json({ message: 'Bad request! Email inválido ou obrigatório' });
    }

    this.userService.createUser(name, email);
    return response.status(201).json({ message: 'Usuário criado' });
  }

  getAllUsers = (request: Request, response: Response) => {
    const users = this.userService.getAllUsers();
    return response.status(200).json(users);
  }

  deleteUser = (request: Request, response: Response) => {
    const { email } = request.body;

    if (!email || !this.isValidEmail(email)) {
      return response.status(400).json({ message: 'Bad request! Email inválido ou obrigatório' });
    }

    const userDeleted = this.userService.deleteUser(email);
    if (!userDeleted) {
      return response.status(404).json({ message: 'Usuário não encontrado' });
    }

    return response.status(200).json({ message: 'Usuário deletado' });
  }

  private isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
