import validate from "validate.js";
import errors from "@feathersjs/errors";

export default rules => async context => {
	const { data } = context;
	const validationErrors = validate(data, rules);
	if (validationErrors) {
		throw new errors.Unprocessable("Validation Error", validationErrors);
	}

	return context;
};
