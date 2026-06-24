const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');
const os = require('os'); 

const app = express();

function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        for (const networkAddress of networkInterface) {
            if (networkAddress.family === 'IPv4' && !networkAddress.internal) {
                if (/wlan|ap|swlan|p2p|rndis/i.test(interfaceName)) {
                    return networkAddress.address;
                }
            }
        }
    }
    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        for (const networkAddress of networkInterface) {
            if (networkAddress.family === 'IPv4' && !networkAddress.internal) {
                return networkAddress.address;
            }
        }
    }
    return '127.0.0.1'; 
}

const options = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.crt'))
};

const server = https.createServer(options, app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('Rider device linked to session:', socket.id);
    socket.on('offer', (data) => socket.broadcast.emit('offer', data));
    socket.on('answer', (data) => socket.broadcast.emit('answer', data));
    socket.on('candidate', (data) => socket.broadcast.emit('candidate', data));
    socket.on('hangup', () => socket.broadcast.emit('hangup'));
    socket.on('disconnect', () => console.log('Rider disconnected:', socket.id));
});

const PORT = 3000;
const detectedIP = getLocalIPAddress();

server.listen(PORT, '0.0.0.0', () => {
    console.log(`===================================================`);
    console.log(`🏍️  MotoComm Local Server Successfully Deployed Offline!`);
    console.log(`===================================================`);
    console.log(`1. Ensure your Android Hotspot is Active.`);
    console.log(`2. Instruct Passenger to link to your WiFi Hotspot.`);
    console.log(`3. Open browsers on both devices and go EXACTLY to:`);
    console.log(`\n   👉  https://${detectedIP}:${PORT}  👈\n`);
    console.log(`===================================================`);
});