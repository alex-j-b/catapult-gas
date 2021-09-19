const dayjs = require('dayjs');

// Return date format n days ago
const getSubDate = (day) => {
    const date = dayjs();
    const subDate = date.subtract(day, 'day').format('DD-MM-YYYY');
    return subDate;
};

module.exports = {
    "getSubDate": getSubDate
};
