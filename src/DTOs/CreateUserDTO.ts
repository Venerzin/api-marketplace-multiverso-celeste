import { t, type Static } from "elysia";

export const createUserSchema = t.Object({
	name: t.String(),
	email: t.String(),
	password: t.String({ minLength: 8, error: "Senha muito curta" }),
});

export type CreateUserDTO = Static<typeof createUserSchema>;
