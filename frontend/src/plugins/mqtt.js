
import mqtt from 'mqtt';

const settings = {
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8), // Generate a random client ID
    // protocol: 'tcp', // Use WebSocket protocol
}
const client = mqtt.connect("https://broker.mqttdashboard.com", settings);

export default client