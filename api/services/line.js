const axios = require("axios");

const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

const instance = axios.create({
	baseURL: "https://api.line.me/v2/bot",
	headers: {
		Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
	},
});

module.exports = {
	replyMessage: ({ replyToken, message }) => {
		return instance.post("/message/reply", {
			replyToken,
			messages: [{ type: "text", text: message }],
		});
	},
	pushMessage: ({ userId, message }) => {
		return instance.post("/message/push", {
			to: userId,
			messages: [{ type: "text", text: message }],
		});
	},
};
