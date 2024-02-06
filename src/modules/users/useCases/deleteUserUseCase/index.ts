import { UsersRepository } from "../../repositories/implementations/UserRepository";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const usersRepository = UsersRepository.getInstance();
const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

export { deleteUserUseCase };
