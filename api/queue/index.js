const { Queue } = require("bullmq");

const connection = {
	host: process.env.REDIS_HOST || "redis",
	port: 6379,
	maxRetriesPerRequest: null,
	enableReadyCheck: false,
};

const eventQueue = new Queue("line-events", {
	connection
});

module.exports = eventQueue;
