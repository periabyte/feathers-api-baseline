import errors from "@feathersjs/errors";

export default ctx => {
	if (ctx.error) {
		const { error } = ctx;
		if (!error.code) {
			ctx.error = new errors.GeneralError("Internal Server Error");
			return ctx;
		}
		if (error.code === 404 || process.env.NODE_ENV === "production") {
			error.stack = null;
		}
		return ctx;
	}
};
