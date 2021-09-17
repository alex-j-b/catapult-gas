---------------------- Creation of gas_volume_2021_09 table----------------------

DROP TABLE IF EXISTS gas_volume_2021_09;

CREATE TABLE gas_volume_2021_09 (
    device_id INT NOT NULL,
    liter     INT NOT NULL,
    ts BIGINT NOT NULL
);


---------------------- Populate gas_volume_2021_09----------------------
--> 10 days random values for 5 devices every 10 minutes
--> 7205 rows

INSERT INTO gas_volume_2021_09 (device_id, liter, ts)
SELECT
    device_serie.n as device_id,
    (((TRUNC(RANDOM() * 3) + 1) * 60) - ROUND((RANDOM()-0.5) * device_serie.n * 10)) as liter,
    ts_serie.n as ts
FROM generate_series(
    cast(extract(epoch FROM current_timestamp) * 1000 - 864000000 as BIGINT),
    cast(extract(epoch FROM current_timestamp) * 1000 as BIGINT),
    600000
) as ts_serie(n), generate_series(1, 5) as device_serie(n);
