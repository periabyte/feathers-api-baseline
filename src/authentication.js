import authentication from "@feathersjs/authentication";
import jwt from "@feathersjs/authentication-jwt";
import local from "@feathersjs/authentication-local";
import oauth2 from "@feathersjs/authentication-oauth2";
import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";

export default app => {
	const config = app.get("authentication");

	// Set up authentication with the secret
	app.configure(authentication(config));
	app.configure(jwt());
	app.configure(local());

	app.configure(
		oauth2(
			Object.assign(
				{
					name: "google",
					Strategy: GoogleStrategy
				},
				config.google
			)
		)
	);

	app.configure(
		oauth2(
			Object.assign(
				{
					name: "facebook",
					Strategy: FacebookStrategy
				},
				config.facebook
			)
		)
	);

	// The `authentication` service is used to create a JWT.
	// The before `create` hook registers strategies that can be used
	// to create a new valid JWT (e.g. local or oauth2)
	app.service("authentication").hooks({
		before: {
			create: [authentication.hooks.authenticate(config.strategies)],
			remove: [authentication.hooks.authenticate("jwt")]
		}
	});
};
