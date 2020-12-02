const net = require('net');
const fs = require('fs');

const client = net.createConnection({ port: 9898 }, () => {
    client.write('CLIENT: ' + client.localAddress + ":" + client.localPort);
});

let stringdata = "";

client.on('data', async (data) => {
    // console.log(data.toString());

    stringdata += data.toString();
    if (data.toString().split("").slice(-1)[0] == "=") {
        fs.writeFileSync("play.flac", stringdata, {encoding: "base64"});
        console.log("done!");
        client.write();
        client.end();
    }
});

client.on('end', () => {
    console.log('CLIENT: I disconnected from the server.');
});