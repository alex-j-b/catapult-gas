const volumeSensors = { "1": 73, "2": 38, "3": 91, "4": 12, "5": 57};

const sensor = (mqttClient) => {
    setInterval(() => {
        for (const [k, v] of Object.entries(volumeSensors)) {
            // Update last meter readings with +/- 3 liters
            const rdm3 = Math.round(Math.random() * 6) - 3;
            const newV = Math.abs(v + rdm3);
            volumeSensors[k] = newV;

            // Publish each sensor data every 10s
            const payload = JSON.stringify({
                deviceId: k,
                timestamp: Date.now(),
                value: newV
            });
            mqttClient.publish(`/gas/${k}/volume`, payload);
        }
    }, 10000);
};

module.exports = sensor;
