import { hashSync as hash } from "bcrypt";

import { CreateUserDTO } from "../../../../DTOs/CreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute({ name, email, password }: CreateUserDTO) {
		const saltRounds = 10;
		const hashedPassword = hash(password, saltRounds);

		const user = await this.userRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		return user.id;
	}
}

export { CreateUserUseCase };
