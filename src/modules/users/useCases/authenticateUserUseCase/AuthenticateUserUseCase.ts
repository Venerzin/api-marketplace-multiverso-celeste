import { compareSync } from "bcrypt";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

class AuthenticateUserUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({ email, password }: IRequest) {
		const user = await this.usersRepository.findByEmail(email);

		if (compareSync(password, user.password)) {
			return {
				id: user.id,
			};
		}

		throw new Error("Email or password incorrect!!!");
	}
}

export { AuthenticateUserUseCase };
