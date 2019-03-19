//This file is in charge of running the server
//Tells us which port the API listens
//must bring in server from servers.js

//Step 6- Import server from server.js
const server = require("./server.js");

//Step 7- Tell server to listen to connections

server.listen(8000, () => console.log("API running on Port 8000"));
