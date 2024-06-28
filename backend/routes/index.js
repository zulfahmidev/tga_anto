var express = require('express');
var router = express.Router();
// const mqtt = require('mqtt');

/* GET home page. */
router.get('/', function (req, res, next) {

  return res.send('a');
  // mqtt.publish('hello', 'Hello MQTT');
  // mqtt.publish({
  //   topic: 'hello',
  //   payload: Buffer.from('World'),
  //   qos: 1
  // }, (err) => {
  //   if (err) {
  //     res.status(500).send('Failed to send message');
  //   } else {
  //     res.send(`Message sent to ${topic}: ${message}`);
  //   }
  // });
});

module.exports = router;
