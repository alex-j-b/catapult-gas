// Postgres client
const { Client } = require('pg');
const pgClient = new Client();
pgClient.connect();
// Express
const express = require('express');
const app = express();
app.use(express.json());


app.get('/gas10', async (req, res) => {

    const getLast10Days = await pgClient.query(
        `SELECT n.day, d.device_id,
        (SELECT ROUND(AVG(value))
            FROM gas_volume
            WHERE timestamp >= ((SELECT timestamp FROM gas_volume ORDER BY timestamp DESC LIMIT 1) - (86400000 * n.day))
            AND timestamp <= ((SELECT timestamp FROM gas_volume ORDER BY timestamp DESC LIMIT 1) - (86400000 * (n.day - 1)))
            AND device_id = d.device_id
        ) AS avg_value
    FROM generate_series(1, 10) AS n(day), generate_series(1, 5) AS d(device_id);`
    );
    console.log('getLast10Days :>> ', getLast10Days.rows);

    res.json(getLast10Days.rows);
})

app.listen(4000, () => {
    console.log(`Listening on port ${4000}...`)
})
