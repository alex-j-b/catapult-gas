// Postgres client
const { Client } = require('pg');
const pgClient = new Client();
pgClient.connect();
// Redis client
const redis = require('redis');
const redisClient = redis.createClient({
    host: 'redis',
    port: 6379
});
redisClient.flushall('ASYNC');


const receptor = async (mqttClient) => {

    // Get last timestamp inserted from gas_volume table
    const getTs = await pgClient.query(
        `SELECT timestamp
        FROM gas_volume
        ORDER BY timestamp DESC LIMIT 1`
    );
    // Next insertion in 10 min
    let nextTimestamp = Number(getTs.rows[0].timestamp) + 600000;
    console.log('nextTimestamp :>> ', nextTimestamp);

    // Subscribe to mqtt /gas/#
    mqttClient.subscribe('/gas/#', (err) => {
        if (err) throw err;
    })

    // Handle sensors mqtt messages
    mqttClient.on('message', (topic, payload) => {
        // console.log(`payload: ${payload}`);
        // console.log('');

        const { deviceId, value, timestamp } = JSON.parse(payload);
        const kCounter = `counter${deviceId}`;
        const kValue = `value${deviceId}`;


        // Update value average in Redis
        redisClient.mget([kCounter, kValue], (err, res) => {
            if (!res[0]) {
                redisClient.mset(kCounter, 1, kValue, value);
            }
            else {
                const cacheCount = Number(res[0]);
                const cacheValue = Number(res[1]);
                console.log('[cacheCount, cacheValue] :>> ', res);
                const newCacheValue = Math.round((cacheCount * cacheValue + value) / (cacheCount + 1));
                redisClient.set(kValue, newCacheValue);
                redisClient.incr(kCounter);
            }

            // Once 10 min passed -> insert new rows in gas_volume table
            if (timestamp > nextTimestamp && deviceId === '5') {
                console.log('10 min passed !');
                redisClient.mget(['value1', 'value2','value3', 'value4', 'value5'], async (err, res) => {
                    if (err) throw err;
                    console.log('DB UPDATE :>> ', res);
                    console.log('');
                    await pgClient.query(`
                        INSERT INTO gas_volume (device_id, value, timestamp)
                        VALUES
                            (1, ${res[0]}, ${nextTimestamp}),
                            (2, ${res[1]}, ${nextTimestamp}),
                            (3, ${res[2]}, ${nextTimestamp}),
                            (4, ${res[3]}, ${nextTimestamp}),
                            (5, ${res[4]}, ${nextTimestamp});`
                    );
                })

                redisClient.mset('counter1', 1, 'counter2', 1, 'counter3', 1, 'counter4', 1, 'counter5', 1);
                nextTimestamp += 600000;
            }
        })
    })
};

module.exports = receptor;
