const mqtt = require('mqtt');
const config = { username: 'catapult', password: 'secret' };
const mqttClient  = mqtt.connect('mqtt://mosquitto:1883', config);

const sensor = require('./sensor.js');
const receptor = require('./receptor.js');


mqttClient.on('connect', () => {
    sensor(mqttClient);
    receptor(mqttClient);
})

mqttClient.on('error', (err) => {
    console.log(`err: ${err}`);
})
