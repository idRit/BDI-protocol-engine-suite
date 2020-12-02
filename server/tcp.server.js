const net = require('net');
const fs = require('fs');

const server = net.createServer(socket => {

    socket.on('data', data => {
        let packet = JSON.parse(data.toString());

        if (packet.req == 0)
            fs.readFile(__dirname + "/kawaii.flac", { encoding: 'base64' }, async (err, data) => {
                if (err) console.log(err);
                // console.log(data.toString());

                let obj = {
                    base64: data.toString(),
                    timestamp: Date.now(),
                }

                // console.log("sent at: " + obj.timestamp);

                socket.write(JSON.stringify(obj) + "<>?");
                socket.end();
            });
        else console.log(packet.message);

    });

    // socket.write('SERVER: Hello! This is server speaking.<br>');
    // socket.end('SERVER: Closing connection now.<br>');

}).on('error', err => {
    console.log(err);
});

server.listen(9898, () => {
    console.log('opened server on', server.address().port);
});