import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { GetUserUseCase } from "./GetUserUseCase";

const usersRepository = UsersRepository.getInstance();
const getUserUseCase = new GetUserUseCase(usersRepository);

export { getUserUseCase };
