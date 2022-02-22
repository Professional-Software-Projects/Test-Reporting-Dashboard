# Test-Reporting-Dashboard

Test report software for WANDisco as part of our Professional Software Projects module at Sheffield Hallam University.

By Ross Edwards, James Ackers and Philip Janes.

## Project Setup

Before running anything, type `npm install` into the console in the directory you intend to run to install the dependencies.

## Running the dashboard without containerisation

To run the server, type `cd server` and then `npm start`.

To run the client, type `cd client` and then `npm start`.

To run the database, go into your mongodb `bin` directory, then type `.\mongod.exe --auth --port 27017 --dbpath "C:\PATH\TO\PROJECT\Test-Reporting-Dashboard\server\db\data`.

## Running the dashboard with containerisation

You will need to have Docker and Docker Compose installed for this.

To build the image, type `docker build --tag NAME_OF_IMAGE ./NAME_OF_IMAGE/`.

Once the images have been built, the dashboard can be run with the command `docker-compose up`, which will run the frontend, backend and database in three separate containers. When you're finished with the container, run the command `docker-compose stop` to close it. After the first time running the container, you can run it with `docker-compose start` instead.

If you would like to access the MongoDB Shell whilst the container is running, execute the command `docker exec -it test-reporting-dashboard-database bash`, then if the prompt changes to a shebang (!#), type `mongo` and you will enter the shell and can enter commands.

## Dumping and Restoring Data

To dump the data from the database so that it can be pushed to GitHub, use the command `docker exec -i <container_name> /usr/bin/mongodump --username <username> --password <password> --authenticationDatabase admin --db <database_name> --out /dump`. Once the data has been dumped, copy the data out to the repository with `docker cp <container_name>:/dump path/to/project/test-reporting-dashboard/server/data`.

To copy the data back into the container, use the command `docker cp path/to/project/test-reporting-dashboard/server/data <container_name>:/dump`, then `docker exec -i <container_name> /usr/bin/mongorestore --username <username> --password <password> --authenticationDatabase admin --db <database_name> /dump/<database_name>`.

If you want to delete the dump files from the container, run the command `docker exec -it <container_name> /bin/bash` then `rm -rf /dump`

An alternative method of dumping files is to install the MongoDB Database Tools (https://www.mongodb.com/try/download/database-tools) and running the MongoDump application whilst having the database open. It will automatically
dump the collections into the dump folder alongside all the applications, in BSON format.


