const net = require('net');
const fs = require('fs');

const client = net.createConnection({ port: 9898 }, () => {

    let packet = {
        address: client.localAddress,
        port: client.port,
        req: 0, // straight pass with no blackbox routing
    }

    client.write(JSON.stringify(packet));
});

let stringdata = "";

client.on('data', async (data) => {
    // console.log(data.toString());

    stringdata += data.toString();
    if (data.toString().split("").slice(-3)[0] == "<") {

        console.log("done!");
        let obj = JSON.parse(stringdata.split("<>?")[0]);

        fs.writeFileSync("play.flac", obj.base64, { encoding: "base64" });

        let packet = {
            address: client.localAddress,
            port: client.port,
            req: 1, // acknowledgment
            message: "received after: " + ((Date.now() - obj.timestamp) / 1000).toString() + " seconds",
        }
        client.write(JSON.stringify(packet));

        stringdata = "";

        client.end();
    }
});

client.on('end', () => {
    console.log('CLIENT: disconnected');
});

