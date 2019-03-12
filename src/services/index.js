import users from "./users/users.service";

// eslint-disable-next-line no-unused-vars
export default app => {
	app.configure(users);
};
