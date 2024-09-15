import { UserController } from '../controllers/UserController';
import { makeMockResponse } from '../mocks/mockResponse';

describe('UserController', () => {
  const userController = new UserController();
  const mockResponse = makeMockResponse();

  it('should return 400 if name is missing', () => {
    const mockRequest: any = {
      body: { email: 'test@example.com' },
    };

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toEqual({ message: 'Bad request! Name obrigatório' });
  });

  it('should return 400 if email is invalid or missing', () => {
    const mockRequest: any = {
      body: { name: 'Test User' },
    };

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toEqual({ message: 'Bad request! Email inválido ou obrigatório' });
  });

  it('should create a user if name and email are valid', () => {
    const mockRequest: any = {
      body: { name: 'Test User', email: 'test@example.com' },
    };

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toEqual({ message: 'Usuário criado' });
  });

  it('should delete a user if email is valid', () => {
    const mockRequest: any = {
      body: { email: 'joana@dio.com' },
    };

    userController.deleteUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toEqual({ message: 'Usuário deletado' });
  });

  it('should return 404 if user to delete is not found', () => {
    const mockRequest: any = {
      body: { email: 'notfound@dio.com' },
    };

    userController.deleteUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(404);
    expect(mockResponse.state.json).toEqual({ message: 'Usuário não encontrado' });
  });
});
function expect(status: any) {
  throw new Error('Function not implemented.');
}

