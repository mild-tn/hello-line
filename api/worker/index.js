const { Worker } = require("bullmq");

const connection = {
	host: process.env.REDIS_HOST || "redis",
	port: 6379,
	maxRetriesPerRequest: null,
	enableReadyCheck: false,
};

const worker = new Worker(
	"line-events",
	async (job) => {
		const handleEvent = require("../services/handleEvent");
		return handleEvent(job.data);
	},
	{ connection }
);

worker.on("completed", job => console.log(`Job ${job.id} done`));
worker.on("failed", (job, err) => console.log(`Job ${job.id} failed:`, err));

module.exports = worker;
