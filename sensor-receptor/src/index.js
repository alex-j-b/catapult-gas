const mqtt = require('mqtt');
const config = { username: process.env.MQTT_USER, password: process.env.MQTT_PASSWORD };
const mqttClient  = mqtt.connect(process.env.MQTT_HOST, config);

const sensor = require('./sensor.js');
const receptor = require('./receptor.js');


mqttClient.on('connect', () => {
    sensor(mqttClient);
    receptor(mqttClient);
})

mqttClient.on('error', (err) => {
    console.log(`err: ${err}`);
})
