import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = UsersRepository.getInstance();
const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };
