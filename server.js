const express = require('express')
const path = require('path')
const MQTT = require('mqtt')
const { Server } = require('socket.io')
const http = require('http')
const {admin, db} = require('./firebase')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = 3000

const mqtt = MQTT.connect("http://4.145.80.180")

// MQTT Connection
mqtt.on('connect', () => {
    console.log('MQTT Connected')

    mqtt.subscribe('si_adam_uno', (err) => {
        if (!err) {
            console.log('Topic si_adam_uno connected')
        }
    })

    mqtt.on('message', ((topic, str) => {
        if (topic == 'si_adam_uno') {
            let data = JSON.parse(
                str.toString()
                .replace(`'`, `"`)
                .replace(`'`, `"`)
                .replace(`'`, `"`)
                .replace(`'`, `"`)
                .toLowerCase()
            );

            data.time = Date.now()

            io.emit('si_adam_server', data)

            // db.ref('history').push(data)
        }
    }))
})
// Socket.IO Connection
io.on('connection', (socket) => {

    socket.on('servo_forward', () => {
        mqtt.publish('si_adam_backend', 'servo_forward')
    })
    
    socket.on('servo_backward', () => {
        mqtt.publish('si_adam_backend', 'servo_backward')
    })

});


app.use(express.static(path.join(__dirname, '/public')))

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})