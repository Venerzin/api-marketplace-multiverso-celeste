import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";

import { userRoutes } from "./routes/users";
import { auth } from "./routes/authentication";

const app = new Elysia()
	.use(
		jwt({
			name: "jwt",
			secret: "EXAMPLE",
			exp: "7d",
		}),
	)
	.use(cookie())
	.listen(3000);

app.use(auth);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

type IServer = typeof app;

export { IServer, app as App };
