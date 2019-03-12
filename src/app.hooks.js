// Application hooks that run for every service
import log from "./hooks/log";
import errorHandler from "./hooks/errorHandler";

export default {
	before: {
		all: [log()],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	after: {
		all: [log()],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [log(), errorHandler],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
