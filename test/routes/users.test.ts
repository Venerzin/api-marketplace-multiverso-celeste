// test/index.test.ts
import { describe, expect, it } from "bun:test";
import { faker } from "@faker-js/faker";
import { App } from "../../src";

const HOST = "http://localhost:3000";

const name = faker.person.fullName();
const email = faker.internet.email();
const password = faker.internet.password({ length: 8 });

describe("User routes", () => {
	it("should create a new user", async () => {
		const fetch = await App.handle(
			new Request(`${HOST}/users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			}),
		);

		const response = await fetch.text();

		expect(response).toBe(
			JSON.stringify({
				success: true,
				message: "User created successfully",
				data: null,
			}),
		);
	});

	it("should authenticate the new user", async () => {
		const fetch = await App.handle(
			new Request(`${HOST}/auth/sign-in`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			}),
		);

		const response = await fetch.text();

		expect(response).toBe(
			JSON.stringify({
				success: true,
				data: null,
				message: "Account login successfully",
			}),
		);
	});

	it("shouldn't list the users", async () => {
		const fetch = await App.handle(
			new Request(`${HOST}/users`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}),
		);
	});
});
