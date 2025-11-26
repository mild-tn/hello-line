var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('index', { title: 'Hello World!!' });
});

router.post("/webhook", async (req, res) => {
  const events = req.body.events;
  const eventQueue = require("../queue");

  for (const event of events) {
    await eventQueue.add("event", event);
  }

  res.sendStatus(200);
});


module.exports = router;
