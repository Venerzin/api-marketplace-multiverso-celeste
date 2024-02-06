import { createUserSchema } from "../DTOs/CreateUserDTO";

import { createUserUseCase } from "../modules/users/useCases/createUserUseCase/index";
import { listUsersUseCase } from "../modules/users/useCases/listUsersUseCase";
import { deleteUserUseCase } from "../modules/users/useCases/deleteUserUseCase";
import { getUserUseCase } from "../modules/users/useCases/getUserUseCase";
import { IServer } from "..";
import { isAuthenticated } from "../middlewares/auth";

const userRoutes = (app: IServer) => {
	app.get(
		"/users",
		async ({ jwt, set, cookie: { access_token } }) => {
			const users = await listUsersUseCase.execute();

			return users;
		},
		{ beforeHandle: isAuthenticated },
	);

	app.get("/users/:id", ({ params: { id } }) => {
		const user = getUserUseCase.execute(id);

		return user;
	});

	app.post(
		"/users",
		async ({ body, set }) => {
			const userId = await createUserUseCase.execute(body);

			set.status = 204;

			return {
				success: true,
				message: "User created successfully",
				data: null,
			};
		},
		{
			body: createUserSchema,
		},
	);

	app.delete("users/:id", async ({ params: { id }, set }) => {
		await deleteUserUseCase.execute(id);
		set.status = 204;
	});

	return Promise.resolve(app);
};

export { userRoutes };
