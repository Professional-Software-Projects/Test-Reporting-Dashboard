docker build -t "server" ./server/
docker build -t "client" ./client/
docker-compose up -d --build