const http = require("http");
const app = require("./app.js");
const port = process.env.PORT;
const server  = http.createServer(app);
const { initilizeSocket } = require("./socket.js")

initilizeSocket(server);

server.listen(port, () => {
    console.log(`server running on port  ${port}`);
});