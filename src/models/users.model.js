// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from "objection";

class users extends Model {
	static get tableName() {
		return "users";
	}

	static get jsonSchema() {
		return {
			type: "object",
			required: ["password"],

			properties: {
				email: { type: ["string", "null"] },
				password: "string",

				googleId: { type: "string" },

				facebookId: { type: "string" }
			}
		};
	}

	$beforeInsert() {
		this.createdAt = new Date().toISOString();
		this.updatedAt = new Date().toISOString();
	}

	$beforeUpdate() {
		this.updatedAt = new Date().toISOString();
	}
}

export default app => {
	const db = app.get("knex");

	db.schema
		.hasTable("users")
		.then(exists => {
			if (!exists) {
				db.schema
					.createTable("users", table => {
						table.increments("id");

						table.string("email").unique();
						table.string("password");

						table.string("googleId");

						table.string("facebookId");

						table.timestamp("createdAt");
						table.timestamp("updatedAt");
					})
					.then(() => console.log("Created users table")) // eslint-disable-line no-console
					.catch(e => console.error("Error creating users table", e)); // eslint-disable-line no-console
			}
		})
		.catch(e => console.error("Error creating users table", e)); // eslint-disable-line no-console

	return users;
};
