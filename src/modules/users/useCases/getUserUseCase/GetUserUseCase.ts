import { IUsersRepository } from "../../repositories/IUsersRepository";

class GetUserUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute(id: string) {
		const user = await this.usersRepository.findById(id);

		return { ...user, password: undefined };
	}
}

export { GetUserUseCase };
