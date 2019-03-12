import { Model } from "objection";
import knex from "knex";

export default app => {
	const { client, connection } = app.get("postgres");
	const knexInstance = knex({ client, connection, useNullAsDefault: false });

	Model.knex(knexInstance);

	app.set("knex", knexInstance);
};
