docker build ./server/
docker build ./client/
docker-compose up -d --remove-orphans --force-recreate