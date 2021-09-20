// Postgres client
const { Client } = require('pg');
const pgClient = new Client();
pgClient.connect();
// Redis client
const redis = require('async-redis');
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
redisClient.flushall();


const receptor = async (mqttClient) => {
    // Subscribe to mqtt /gas/#
    mqttClient.subscribe('/gas/#', (err) => {
        if (err) throw err;
    })

    // Handle devices' sensors mqtt messages
    mqttClient.on('message', (topic, payload) => {
        const { deviceId, value } = JSON.parse(payload);
        console.log(`mqtt message -> device ${deviceId} + ${value}L`);
        redisClient.incrby(deviceId, value);
    })

    // Every 10 min -> insert new rows in gas_volume_2021_09 table
    setTimeout(async () => {
        const keys = await redisClient.keys('*');
        const values = await redisClient.mget(keys);

        let insertQuery = 'INSERT INTO gas_volume_2021_09 (device_id, liter, ts) VALUES';
        keys.forEach((key, i) => {
            insertQuery += ` (${key}, ${values[i]}, cast(extract(epoch FROM current_timestamp) * 1000 as BIGINT)),`;
        });
        insertQuery = insertQuery.slice(0, -1);
        await pgClient.query(insertQuery);

        redisClient.flushall();
    }, 35000);
};

module.exports = receptor;
