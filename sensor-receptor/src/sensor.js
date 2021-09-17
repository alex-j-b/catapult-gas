const sensor = (mqttClient) => {
    setInterval(() => {
        for (let i = 1; i <= 5; i++) {
            // Random value from 1 to 3
            const value = Math.ceil(Math.random() * 3);

            // Publish each sensor data every 10s
            const payload = JSON.stringify({
                deviceId: i,
                timestamp: Date.now(),
                value: value
            });
            mqttClient.publish(`/gas/${i}/volume`, payload);
        }
    }, 10000);
};

module.exports = sensor;
