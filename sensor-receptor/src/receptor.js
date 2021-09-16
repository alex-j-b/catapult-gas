const receptor = (conn) => {
    conn.subscribe('/gas/#', (err) => {
        if (err) console.log(`err subscribe: ${err}`);
    })

    conn.on('message', (topic, payload) => {
        console.log(`payload: ${payload.toString()} ==> topic: ${topic}`);
        console.log('');
    })
};

module.exports = receptor;