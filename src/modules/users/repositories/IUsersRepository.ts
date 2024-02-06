import { User } from "@prisma/client";
import { CreateUserDTO } from "../../../DTOs/CreateUserDTO";

export interface IUsersRepository {
	create({ name, email, password }: CreateUserDTO): Promise<User>;
	list(): Promise<User[]>;
	delete(id: string): Promise<User>;
	findById(id: string): Promise<User>;
	findByEmail(email: string): Promise<User>;
}
