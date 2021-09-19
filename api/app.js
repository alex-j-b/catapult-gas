// Express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// Postgres client
const { Client } = require('pg');
const pgClient = new Client();
pgClient.connect();
// Tools
const { parseGas10 } = require('./src/parser.js');


app.get('/gas10', async (req, res) => {
    const getLast10Days = await pgClient.query(
        `SELECT n.day, d.device_id,
            (SELECT SUM(liter)
                FROM gas_volume_2021_09
                WHERE ts >= extract(epoch from NOW()::date - INTERVAL '1 DAY' * n.day) * 1000
                AND ts <= extract(epoch from NOW()::date - INTERVAL '1 DAY' * (n.day-1)) * 1000
                AND device_id = d.device_id
            ) AS sum_day
        FROM generate_series(0, 9) AS n(day), generate_series(1, 5) AS d(device_id)
        ORDER BY n.day, d.device_id`
    );
    const parsedData = parseGas10(getLast10Days.rows);

    res.json(parsedData);
})

app.listen(4000, () => {
    console.log(`Listening on port ${4000}...`)
})
