import { UsersRepository } from "../modules/users/repositories/implementations/UserRepository";

type IPayload = {
	userId: string | false;
};

const usersRepository = UsersRepository.getInstance();

const isAuthenticated = async ({ cookie, jwt, set }: any) => {
	if (!cookie!.access_token) {
		set.status = 401;
		return {
			success: false,
			message: "Unauthorized",
			data: null,
		};
	}

	const { userId } = (await jwt.verify(cookie!.access_token)) as IPayload;

	if (!userId) {
		set.status = 401;
		return {
			success: false,
			message: "Unauthorized",
			data: null,
		};
	}

	const user = await usersRepository.findById(userId);

	if (!user) {
		set.status = 401;
		return {
			success: false,
			message: "Unauthorized",
			data: null,
		};
	}

	return;
};

export { isAuthenticated };
