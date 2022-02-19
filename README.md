# Test-Reporting-Dashboard
Test report software for WANDisco as part of our Professional Software Projects module at Sheffield Hallam University.

# Project Setup
Before running anything, type `npm install` into the console in the directory you intend to run to install the dependencies

# Running the project
To run the server, type `cd server` and then `npm start`

To run the client, type `cd client` and then `npm start`

To run the database, go into your mongodb `bin` directory, then type `.\mongod.exe --auth --port 27017 --dbpath "C:\PATH\TO\PROJECT\Test-Reporting-Dashboard\server\db\data`

# Docker Setup
To build the image, type `docker build --tag NAME_OF_IMAGE .`

To run the container, type `docker run -p 5000:5000 -d NAME_OF_IMAGE` where the first number of 5000:5000 is the public port, and the second number is the private port.
