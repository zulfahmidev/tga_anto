var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mqtt = require('mqtt')

var indexRouter = require('./routes/index');

var client = mqtt.connect('http://broker.mqttdashboard.com')


client.on('connect', () => {
    console.log('MQTT connected');
    // Subscribe ke topik tertentu
    client.subscribe('anto', (err) => {
        if (!err) {
            console.log('Subscribed to myTopic');
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    // Handle incoming messages as needed
});

// const mosca = require('mosca');
// const server = new mosca.Server({
//     port: 1883
// });
// const mqtt = require('./mqtt'); // Impor instance Aedes

var app = express();
// mqtt.attachHttpServer(app)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API Route
app.use('/api', indexRouter);

// Web Route
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

module.exports = app;
