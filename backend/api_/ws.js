const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());

const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

let broadcaster = null;
let viewers = [];

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "broadcaster") {
            broadcaster = ws;
        } else if (data.type === "viewer") {
            viewers.push(ws);
            if (broadcaster) {
                broadcaster.send(JSON.stringify({ type: "new-viewer" }));
            }
        } else if (data.type === "signal") {
            if (data.target === "broadcaster" && broadcaster) {
                broadcaster.send(JSON.stringify({ type: "signal", signal: data.signal, viewerId: ws.id }));
            } else if (data.target === "viewer") {
                viewers.forEach(viewer => {
                    if (viewer.readyState === WebSocket.OPEN) {
                        viewer.send(JSON.stringify({ type: "signal", signal: data.signal }));
                    }
                });
            }
        }
    });

    ws.on("close", () => {
        if (ws === broadcaster) {
            broadcaster = null;
        } else {
            viewers = viewers.filter(client => client !== ws);
        }
    });
});

server.listen(3001, () => console.log("✅ WebSocket Server يعمل على المنفذ 3001"));
