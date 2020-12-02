var udp = require('dgram');

var server = udp.createSocket('udp4');

server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

