const { getSubDate } = require('./utility.js');

const parseGas10 = (rawData) => {
    const sum = {};
    const dataPoints = {};
    rawData.forEach(el => {
        // Daily by device
        dataPoints[el.device_id] = dataPoints[el.device_id] || [];
        dataPoints[el.device_id].push({ x: getSubDate(el.day), y: Number(el.sum_day) });
        sum[el.device_id] = sum[el.device_id] ? sum[el.device_id] + Number(el.sum_day) : Number(el.sum_day);
        // Daily total
        dataPoints.all = dataPoints.all || [];
        dataPoints.all[el.day] = dataPoints.all[el.day] || {x: getSubDate(el.day), y: 0};
        dataPoints.all[el.day].y += Number(el.sum_day);
        sum.all = sum.all ? sum.all + Number(el.sum_day) : Number(el.sum_day);
    });

    const parsedData = [];
    for (const [key, value] of Object.entries(dataPoints)) {
        parsedData.push({ "id": `${key}`, "total": sum[key], "data": value });
    }
    parsedData.unshift(parsedData.pop())

    return parsedData;
};

module.exports = {
    "parseGas10": parseGas10
};
