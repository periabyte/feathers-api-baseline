// Initializes the `users` service on path `/users`
import createService from "feathers-objection";
import createModel from "../../models/users.model";
import hooks from "./users.hooks";

export default app => {
	const Model = createModel(app);
	const paginate = app.get("paginate");

	const options = {
		model: Model,
		paginate
	};

	// Initialize our service with any options it requires
	app.use("/users", createService(options));

	// Get our initialized service so that we can register hooks and filters
	const service = app.service("users");

	service.hooks(hooks);
};
