const volumeSensors = { "1": 15, "2": 35, "3": 55, "4": 75, "5": 95};

const sensor = (conn) => {
    setInterval(() => {
        for (const [k, v] of Object.entries(volumeSensors)) {
            // Update last meter readings with +/- 3 liters
            const rdm3 = (Math.floor(Math.random() * 3) + 1) * (Math.round(Math.random()) ? 1 : -1);
            const newV = v + rdm3;
            volumeSensors[k] = newV;

            // Publish each sensor data every 10s
            const payload = JSON.stringify({
                deviceId: k,
                timestamp: Date.now(),
                value: newV
            });
            conn.publish(`/gas/${k}/volume`, payload);
        }
    }, 10000);
};

module.exports = sensor;