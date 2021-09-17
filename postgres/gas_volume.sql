---------------------- Creation of gas_volume table----------------------

DROP TABLE IF EXISTS gas_volume;

CREATE TABLE gas_volume (
    device_id INT NOT NULL,
    value     INT NOT NULL,
    timestamp BIGINT NOT NULL
);


---------------------- Start values for each devices ----------------------

INSERT INTO gas_volume(device_id, value, timestamp)
VALUES  (1, 15, 1),
        (2, 35, 1),
        (3, 55, 1),
        (4, 75, 1),
        (5, 95, 1);


---------------------- Populate gas_volume----------------------
--> 10 days random values (+3/-3) for 5 devices every 10 minutes
--> 7200 rows

INSERT INTO gas_volume (device_id, value, timestamp)
SELECT
    d_id.n as device_id,
    (SELECT ABS(value + trunc(random()*6-3)) FROM gas_volume WHERE gas_volume.device_id = d_id.n ORDER BY timestamp DESC LIMIT 1) as value,
    ts.n as timestamp
FROM generate_series(
    cast(extract(epoch FROM current_timestamp) * 1000 - 864000000 as BIGINT),
    cast(extract(epoch FROM current_timestamp) * 1000 as BIGINT),
    600000
) as ts(n), generate_series(1, 5) as d_id(n);

DELETE FROM gas_volume WHERE timestamp = 1;
