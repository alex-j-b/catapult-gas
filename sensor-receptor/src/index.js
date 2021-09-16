const mqtt = require('mqtt');
const config = { username: 'ctp', password: 'secret' };
const conn  = mqtt.connect('mqtt://mosquitto:1883', config);

const sensor = require('./sensor.js');
const receptor = require('./receptor.js');


conn.on('connect', () => {
    sensor(conn);
    receptor(conn);
})

conn.on('error', (err) => {
    console.log(`err: ${err}`);
})