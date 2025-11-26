const lineService = require("./line");

async function handleEvent(event) {
  await new Promise(res => setTimeout(res, 70000));
  if (!event?.type) return;

  const replyToken = event.replyToken;
  const userId = event.source?.userId;

  if (event.type === "message" && event.message.type === "text") {
    const text = event.message.text;

    try {
      await lineService.replyMessage({
        replyToken,
        message: text,
      });

      console.log("Reply success");
    } catch (err) {
      const msg = err?.response?.data?.message;

      console.log("Reply failed:", msg);
      if (msg?.includes("Invalid reply token")) {
        console.log("Fallback to pushMessage");
        await lineService.pushMessage({
          userId,
          message: text,
        });
      } else {
        throw err;
      }
    }
  }
}

module.exports = handleEvent;
