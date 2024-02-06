import { IUsersRepository } from "../../repositories/IUsersRepository";

class ListUsersUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute() {
		const users = await this.usersRepository.list();

		const newUsers = users.map((user) => {
			return { id: user.id, name: user.name };
		});

		return newUsers;
	}
}

export { ListUsersUseCase };
