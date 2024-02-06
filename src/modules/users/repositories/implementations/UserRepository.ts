import { PrismaClient, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";
import { CreateUserDTO } from "../../../../DTOs/CreateUserDTO";

class UsersRepository implements IUsersRepository {
	private static instance: UsersRepository;
	private prisma: PrismaClient;

	private constructor() {
		this.prisma = new PrismaClient();

		this.prisma
			.$connect()
			.then(() => console.log("Conexão estabelecida com sucesso!!!"))
			.catch((err) => console.log("Ops, parece que algo deu errado: ", err));
	}

	public static getInstance(): UsersRepository {
		if (!UsersRepository.instance) {
			UsersRepository.instance = new UsersRepository();
		}

		return UsersRepository.instance;
	}

	async create({ name, email, password }: CreateUserDTO): Promise<User> {
		const user = await this.prisma.user.create({
			data: {
				name,
				email,
				password,
			},
		});

		return user;
	}

	async list(): Promise<User[]> {
		const users = await this.prisma.user.findMany();

		return users;
	}

	async delete(id: string) {
		const user = await this.prisma.user.delete({
			where: {
				id: id,
			},
		});

		return user;
	}

	async findById(id: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			throw new Error("User does'nt exists!");
		}

		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new Error("Email or password incorrect!!!");
		}

		return user;
	}
}

export { UsersRepository };
