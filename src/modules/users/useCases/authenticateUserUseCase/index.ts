import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

const usersRepository = UsersRepository.getInstance();
const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

export { authenticateUserUseCase };
