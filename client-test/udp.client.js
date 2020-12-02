var udp = require('dgram');

var client = udp.createSocket('udp4');

var data = Buffer.from('test');

client.on('message', function (msg, info) {
    console.log('Data received from server : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

client.send(data, 2222, 'localhost', function (error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
    }
});

var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');

client.send([data1, data2], 2222, 'localhost', function (error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
        // client.close();
    }
});