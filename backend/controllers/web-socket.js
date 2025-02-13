const express = require('express'); // Import Express framework
const WebSocket = require('ws'); // Import WebSocket for WebSocket server
const WebSocketClient = require('ws'); // Import WebSocket for connecting to Node-RED WebSocket endpoints
const cors = require('cors'); // Import CORS for cross-origin requests
const http = require('http'); // Import HTTP module
const { parse } = require('path');

// Define Express app
const app = express();
app.use(cors()); // Enable CORS to allow frontend to connect

// Create HTTP server (Required for WebSocket Server)
const server_http = http.createServer(app);

// Create WebSocket Server (Attach to HTTP server)
const server_wss = new WebSocket.Server({ server: server_http });

// Store WebSocket client connections
const clients_wss = new Set();

// Handle new WebSocket client connections
server_wss.on('connection', (ws) => {
    console.log('Client connected');
    clients_wss.add(ws); // Add the connected client to the set

    // Handle messages from client (if any)
    ws.on('message', (message) => {
        console.log(`Received from client: ${message}`);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        clients_wss.delete(ws); // Remove disconnected client
    });
});

// Function to broadcast data to all connected clients
const broadcast = (data) => {
    clients_wss.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data)); // Send JSON-formatted data
        }
    });
};

// Connect to Node-RED WebSocket endpoints
const ws_motor = new WebSocketClient('ws://127.0.0.1:1880/ws/motor');
const ws_amr = new WebSocketClient('ws://127.0.0.1:1880/ws/amr');
const ws_plc = new WebSocketClient('ws://127.0.0.1:1880/ws/plc');

/* 
The data format are 
{
  device: 'Motor',
  timestamp: 1739384496181,
  rpm: 2925,
  temperature: '39.90',
  vibration: '6.37'
}
*/

// Function to handle incoming data from Node-RED WebSockets
const handleNodeRedData = (ws, data_source) => {
    ws.on('message', (data) => {
        try {
            
            // Extract the websocket connection data to JSON with JSON.parse
            const parsedData = JSON.parse(data);
            // console.log(ws)
            console.log(parsedData)
            broadcast({ data_source, data: parsedData });

        } catch (error) {
            console.error(`Error parsing JSON from ${data_source}:`, error);
        }
    });

    ws.on('error', (err) => console.error(`Error in ${data_source}:`, err));
    ws.on('close', () => console.log(`${data_source} WebSocket closed`));
};

// Listen for data from each WebSocket connection
handleNodeRedData(ws_motor, 'motor');
handleNodeRedData(ws_amr, 'amr');
handleNodeRedData(ws_plc, 'plc');

// Start WebSocket server on port 4000
const PORT = 4000;
server_http.listen(PORT, () => {
    console.log(`WebSocket Server running on ws://localhost:${PORT}`);
});
