# Catapult Gas

This app receive, store and visualize meter readings from 5 gas consuming devices.

## Usage

To get started run
```
docker-compose up --build
```

The React dashboard is now available at [http://localhost:3000/](http://localhost:3000/)

## Infrastructure

![alt text](infra.png?raw=true)

## How does it work?

5 gas consuming devices publish meter readings every 10s through sensors `(sensor-receptor/sensor.js)` connected to a MQTT client `(sensor-receptor/receptor.js)` at the `/gas/{deviceId}/volume` topic.

The MQTT client increment a counter for liters consumed by each device in a Redis DB after each publication. Every 10 min the MQTT client store the amount of gas consumed in a PostreSQL DB and reset the counter.

An Express API query PostgreSQL for the daily consumption of the last 10 days, format the data and listen to [http://localhost:4000/gas10](http://localhost:4000/gas10) to send it to the React dashboard.
