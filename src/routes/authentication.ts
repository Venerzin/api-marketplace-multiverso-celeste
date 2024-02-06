import { t } from "elysia";
import { IServer } from "..";
import { authenticateUserUseCase } from "../modules/users/useCases/authenticateUserUseCase";

const auth = (app: IServer) => {
	app.group("auth", (app) =>
		app.post(
			"sign-in",
			async ({ body, set, jwt, setCookie, query }) => {
				const { email, password } = body;

				const { id } = await authenticateUserUseCase.execute({
					email,
					password,
				});

				const accessToken = await jwt.sign({
					userId: id,
				});

				setCookie("access_token", accessToken, {
					maxAge: 15 * 60,
					path: "/",
				});

				return {
					success: true,
					data: null,
					message: "Account login successfully",
				};
			},
			{
				body: t.Object({
					email: t.String({ format: "email" }),
					password: t.String(),
				}),
			},
		),
	);

	return Promise.resolve(app);
};

export { auth };
