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

    mqtt.subscribe('anto', async (err) => {
        if (!err) {
            console.log('Subscribed to anto')
            setInterval(async () => {
                const data = {
                    weight: (Math.random() * 500).toFixed(2), 
                    droplets: (Math.random() * 2).toFixed(2)
                }
                mqtt.publish('anto', JSON.stringify(data))

                // Tambah data ke database
                // await db.ref('history').push(data)
            }, 1000)
        }
    })

})


// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('a user connected');
    mqtt.on('message', ((topic, message) => {
        if (topic == 'anto') {
            socket.emit('anto', message)
        }
    }))
});

app.use(express.static(path.join(__dirname, '/public')))

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})