//This file is in charge of running the server

//Step 6- Import server
const server = require("./server.js");

//Step 7- Tell server to listen to connections

server.listen(8000, () => console.log("API running on Port 8000"));
