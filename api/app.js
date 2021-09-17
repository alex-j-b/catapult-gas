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
            (SELECT SUM(liter)
                FROM gas_volume_2021_09
                WHERE ts >= ((extract(epoch from (NOW()::date - INTERVAL '10 DAY')) * 1000) + (86400000 * n.day))
                AND ts <= ((extract(epoch from (NOW()::date - INTERVAL '9 DAY')) * 1000) + (86400000 * n.day))
                AND device_id = d.device_id
            ) AS sum_day
        FROM generate_series(0, 9) AS n(day), generate_series(1, 5) AS d(device_id)
        ORDER BY n.day, d.device_id`
    );

    res.json(getLast10Days.rows);
})

app.listen(4000, () => {
    console.log(`Listening on port ${4000}...`)
})
