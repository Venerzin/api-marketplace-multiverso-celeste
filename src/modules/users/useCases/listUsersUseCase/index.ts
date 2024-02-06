import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { ListUsersUseCase } from "./ListUsersUseCase";

const usersRepository = UsersRepository.getInstance();
const listUsersUseCase = new ListUsersUseCase(usersRepository);

export { listUsersUseCase };
