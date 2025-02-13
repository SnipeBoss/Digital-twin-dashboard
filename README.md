# Digital Twin Dashboard
## To set up docker images before running
- docker compose up
  
this compose will have 
1. Nodered : used for receive data from OPC UA as a Websocket, also this will storage the motor data to mongodb.
2. MongoDB connection and database : this will run as a database (nosql) to storage data that comes from LoraWAN sensor. 

